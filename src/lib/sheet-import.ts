"use server";

import { createClient } from "@supabase/supabase-js";

const SHEET_ID = "1LXCb3PtJOds7wZK9gM5r56MpljuZ6Gnkbm5ESNGKnhA";

// Helper to create a supabase client (uses server-side env vars)
function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Sheet tab GID → cycle mapping
const SHEETS = [
  {
    name: "Januari",
    gid: "785117583",
    cycleId: "adf25554-3000-45d2-b4c7-32af8ac7d4d1",
    startDate: "2025-12-24",
    endDate: "2026-01-22",
  },
  {
    name: "Februari",
    gid: "1940177080",
    cycleId: "c53e05a8-27b2-4d56-a070-664dc2d88701",
    startDate: "2026-01-23",
    endDate: "2026-02-24",
  },
  {
    name: "Maret",
    gid: "2121841467",
    cycleId: "23bbf648-9c4c-4c6e-821f-cd9f5eac5d21",
    startDate: "2026-02-25",
    endDate: "2026-03-24",
  },
  {
    name: "April",
    gid: "580115797",
    cycleId: "cbe90e1c-a803-4693-be84-e1d7cee2948f",
    startDate: "2026-03-25",
    endDate: "2026-04-24",
  },
  {
    name: "Mei",
    gid: "1745037782",
    cycleId: "ba4003dc-79ec-4e44-8978-3fade9551ed2",
    startDate: "2026-04-25",
    endDate: "2026-05-24",
  },
];

// Channel normalizer
function normalizeChannel(raw: string): string {
  const map: Record<string, string> = {
    "e-money": "e-money",
    emoney: "e-money",
    gopay: "Gopay",
    bca: "BCA",
    jenius: "Jenius",
    mandiri: "Mandiri",
    cash: "Cash",
    ocbc: "OCBC",
    dana: "Dana",
    ovo: "OVO",
  };
  return map[raw.toLowerCase().trim()] ?? raw.trim();
}

// Parse amount: "1,234,567" → 1234567
function parseAmount(raw: string): number {
  return parseInt(raw.replace(/[^\d]/g, ""), 10) || 0;
}

// Parse signed amount from a sheet cell — preserves negative sign.
// e.g. "-104,000" → -104000, "1,234,567" → 1234567
function parseSignedAmount(raw: string): number {
  const trimmed = raw.trim().replace(/"/g, "");
  const isNegative = trimmed.startsWith("-");
  const digits = parseInt(trimmed.replace(/[^\d]/g, ""), 10) || 0;
  return isNegative ? -digits : digits;
}

// Parse date: "1/23/2026" → "2026-01-23"
function parseDate(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const parts = trimmed.split("/");
  if (parts.length !== 3) return null;
  const [m, d, y] = parts;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

// Fetch and parse a single sheet's CSV
async function fetchSheetRows(gid: string) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${gid}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch sheet gid=${gid}: ${res.status}`);
  const text = await res.text();
  return parseCSV(text);
}

// Minimal CSV parser (handles quoted fields)
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  const lines = text.split("\n");
  for (const line of lines) {
    const cols: string[] = [];
    let inQuote = false;
    let cur = "";
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuote = !inQuote;
      } else if (ch === "," && !inQuote) {
        cols.push(cur);
        cur = "";
      } else {
        cur += ch;
      }
    }
    cols.push(cur);
    rows.push(cols);
  }
  return rows;
}

export interface ImportResult {
  imported: number;
  skipped: number;
  errors: string[];
  sheetResults: { sheet: string; imported: number; skipped: number }[];
}

export async function importFromGoogleSheet(): Promise<ImportResult> {
  const supabase = getSupabase();

  // Get all categories for mapping
  const { data: categories } = await supabase.from("categories").select("id, name");
  const categoryMap: Record<string, string> = {};
  for (const cat of categories ?? []) {
    categoryMap[cat.name.toLowerCase().trim()] = cat.id;
  }

  const result: ImportResult = {
    imported: 0,
    skipped: 0,
    errors: [],
    sheetResults: [],
  };

  for (const sheet of SHEETS) {
    let sheetImported = 0;
    let sheetSkipped = 0;

    try {
      // Fetch existing transactions for this cycle (for dedup)
      const { data: existing } = await supabase
        .from("transactions")
        .select("date, description, amount")
        .eq("cycle_id", sheet.cycleId);

      const existingSet = new Set(
        (existing ?? []).map(
          (t) => `${t.date.split("T")[0]}|${t.description.trim().toLowerCase()}|${t.amount}`
        )
      );

      // Fetch and parse sheet rows
      const rows = await fetchSheetRows(sheet.gid);

      let currentDate: string | null = null;
      const toInsert: object[] = [];

      for (const cols of rows) {
        // Date is column B (index 1), Description C (2), Channel D (3), Category E (4), CostType F (5), Amount G (6), Reimburse H (7)
        const rawDate = cols[1]?.trim() ?? "";
        const description = cols[2]?.trim() ?? "";
        const channelRaw = cols[3]?.trim() ?? "";
        const categoryRaw = cols[4]?.trim() ?? "";
        const costTypeRaw = cols[5]?.trim() ?? "";
        const amountRaw = cols[6]?.trim() ?? "";
        const reimburseRaw = cols[7]?.trim() ?? "";

        // Update running date
        if (rawDate && rawDate !== "") {
          const parsed = parseDate(rawDate);
          if (parsed) currentDate = parsed;
        }

        // Skip rows without description or amount
        if (!description || !amountRaw || !currentDate) continue;

        const amount = parseAmount(amountRaw);
        if (amount <= 0) continue;

        // Skip if date is outside this cycle's range
        if (currentDate < sheet.startDate || currentDate > sheet.endDate) continue;

        // Skip if already in DB (dedup)
        const dedupKey = `${currentDate}|${description.toLowerCase()}|${amount}`;
        if (existingSet.has(dedupKey)) {
          sheetSkipped++;
          continue;
        }

        // Map category
        const categoryId = categoryMap[categoryRaw.toLowerCase().trim()];
        if (!categoryId) {
          result.errors.push(`[${sheet.name}] Unknown category: "${categoryRaw}" (${description})`);
          sheetSkipped++;
          continue;
        }

        const isReimbursable = reimburseRaw.toLowerCase() === "y" || reimburseRaw.toLowerCase() === "yes";
        const channel = normalizeChannel(channelRaw);
        const costType = costTypeRaw.toLowerCase().trim();

        toInsert.push({
          cycle_id: sheet.cycleId,
          category_id: categoryId,
          date: currentDate,
          description,
          amount,
          channel,
          cost_type: costType,
          is_reimbursable: isReimbursable,
          is_transferred: false,
        });

        existingSet.add(dedupKey); // prevent re-insert within same batch
      }

      // Bulk insert
      if (toInsert.length > 0) {
        const { error } = await supabase.from("transactions").insert(toInsert);
        if (error) {
          result.errors.push(`[${sheet.name}] Insert error: ${error.message}`);
        } else {
          sheetImported = toInsert.length;
        }
      }
    } catch (e: unknown) {
      result.errors.push(`[${sheet.name}] ${e instanceof Error ? e.message : String(e)}`);
    }

    result.sheetResults.push({ sheet: sheet.name, imported: sheetImported, skipped: sheetSkipped });
    result.imported += sheetImported;
    result.skipped += sheetSkipped;
  }

  return result;
}

export async function syncBudgetLimitsFromSheet() {
  const supabase = getSupabase();
  const { data: categories } = await supabase.from("categories").select("id, name");
  const categoryMap: Record<string, string> = {};
  for (const cat of categories ?? []) {
    categoryMap[cat.name.toLowerCase().trim()] = cat.id;
  }

  const targetCategories = {
    "jajan dean": "T6",
    "transport dean": "T11",
    "jajan bagas": "O6",
    "transport bagas": "O8",
    "laundry": "O11",
  };

  const toUpdate: { cycle_id: string; category_id: string; limit_amount: number }[] = [];
  const errors: string[] = [];

  for (const sheet of SHEETS) {
    for (const [catName, cell] of Object.entries(targetCategories)) {
      const categoryId = categoryMap[catName];
      if (!categoryId) {
        errors.push(`[${sheet.name}] Category "${catName}" not found in DB`);
        continue;
      }
      try {
        const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${sheet.gid}&range=${cell}:${cell}`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
        let text = await res.text();
        // Use signed parse so negative sheet values (e.g. overflow from Jajan)
        // are correctly treated as 0 instead of flipped to a positive limit.
        const parsedAmount = parseSignedAmount(text);
        // Always push an update — even 0 or negative becomes limit 0
        // so the budget card correctly reflects "no available budget".
        toUpdate.push({
          cycle_id: sheet.cycleId,
          category_id: categoryId,
          limit_amount: Math.max(0, parsedAmount),
        });
      } catch (e: unknown) {
        errors.push(`[${sheet.name}] Failed to fetch cell ${cell}: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  let updatedCount = 0;
  for (const item of toUpdate) {
    const { error } = await supabase
      .from("budget_limits")
      .update({ limit_amount: item.limit_amount })
      .eq("cycle_id", item.cycle_id)
      .eq("category_id", item.category_id);
    if (error) {
      errors.push(`Failed to update ${item.category_id}: ${error.message}`);
    } else {
      updatedCount++;
    }
  }

  return { success: true, updated: updatedCount, errors };
}
