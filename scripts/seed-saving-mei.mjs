/**
 * Seed saving entries for Mei (month=5) from April (month=4).
 * Only inserts entries for goals that already have April data
 * but do NOT yet have a Mei entry.
 */

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://iasavxvbpnfkqqqwsayj.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlhc2F2eHZicG5ma3FxcXdzYXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyMjg3MDcsImV4cCI6MjA4NjgwNDcwN30.o-Qq8hqcoowZQhyKu6htUkNRi58qwID6Mr5K6dbZXmA";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const YEAR = 2026;
const SOURCE_MONTH = 4; // April
const TARGET_MONTH = 5; // Mei

async function run() {
  // 1. Get all saving goals for the year
  const { data: goals, error: goalsErr } = await supabase
    .from("saving_goals")
    .select("id, name")
    .eq("year", YEAR);

  if (goalsErr || !goals) {
    console.error("❌ Failed to fetch goals:", goalsErr);
    process.exit(1);
  }
  console.log(`✅ Found ${goals.length} goals for ${YEAR}`);

  const goalIds = goals.map((g) => g.id);

  // 2. Get all April entries
  const { data: aprilEntries, error: aprilErr } = await supabase
    .from("saving_entries")
    .select("goal_id, amount, note")
    .in("goal_id", goalIds)
    .eq("year", YEAR)
    .eq("month", SOURCE_MONTH);

  if (aprilErr) {
    console.error("❌ Failed to fetch April entries:", aprilErr);
    process.exit(1);
  }
  console.log(`✅ Found ${aprilEntries?.length ?? 0} April entries`);

  // 3. Get existing Mei entries (to avoid overwriting)
  const { data: meiEntries, error: meiErr } = await supabase
    .from("saving_entries")
    .select("goal_id")
    .in("goal_id", goalIds)
    .eq("year", YEAR)
    .eq("month", TARGET_MONTH);

  if (meiErr) {
    console.error("❌ Failed to fetch Mei entries:", meiErr);
    process.exit(1);
  }

  const existingMeiGoalIds = new Set((meiEntries ?? []).map((e) => e.goal_id));
  console.log(`ℹ️  ${existingMeiGoalIds.size} goals already have Mei entries (will skip)`);

  // 4. Filter: only goals with April data that are missing Mei entry
  const toInsert = (aprilEntries ?? [])
    .filter((e) => !existingMeiGoalIds.has(e.goal_id))
    .map((e) => ({
      goal_id: e.goal_id,
      year: YEAR,
      month: TARGET_MONTH,
      amount: e.amount,
      note: e.note ?? null,
    }));

  if (toInsert.length === 0) {
    console.log("✅ Nothing to insert — all goals already have Mei entries.");
    process.exit(0);
  }

  console.log(`\n📋 Will insert ${toInsert.length} Mei entries:`);
  for (const entry of toInsert) {
    const goal = goals.find((g) => g.id === entry.goal_id);
    console.log(`   • ${goal?.name ?? entry.goal_id} → Rp ${entry.amount.toLocaleString("id-ID")}`);
  }

  // 5. Bulk insert
  const { error: insertErr } = await supabase.from("saving_entries").insert(toInsert);

  if (insertErr) {
    console.error("❌ Insert failed:", insertErr);
    process.exit(1);
  }

  console.log(`\n✅ Successfully seeded ${toInsert.length} Mei entries from April data!`);
}

run();
