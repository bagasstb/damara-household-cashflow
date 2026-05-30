import { createClient } from "./supabase/server";
import { getCategoryConfig } from "./utils/constants";

export interface MonthlySpending {
  cycleId: string;
  cycleName: string;
  startDate: string;
  categories: Record<string, number>;
}

export interface CategoryComparisonData {
  cycles: { id: string; name: string; startDate: string }[];
  categories: string[];
  categoryColors: Record<string, string>;
  monthlyData: MonthlySpending[];
}

export async function getCategoryComparisonData(): Promise<CategoryComparisonData> {
  const supabase = await createClient();

  // Get all cycles ordered by start date
  const { data: cycles } = await supabase
    .from("cycles")
    .select("id, name, start_date, end_date")
    .order("start_date", { ascending: true });

  if (!cycles || cycles.length === 0) {
    return { cycles: [], categories: [], categoryColors: {}, monthlyData: [] };
  }

  // Get all transactions with their categories
  const { data: transactions } = await supabase
    .from("transactions")
    .select("cycle_id, amount, category_id, category:categories(name, color)")
    .in(
      "cycle_id",
      cycles.map((c) => c.id)
    );

  // Build category name map from transactions
  const categoryNameMap: Record<string, string> = {};
  const categoryColorMap: Record<string, string> = {};

  (transactions || []).forEach((t) => {
    const cat = Array.isArray(t.category) ? t.category[0] : t.category;
    if (cat?.name) {
      categoryNameMap[t.category_id] = cat.name;
      const config = getCategoryConfig(cat.name);
      categoryColorMap[cat.name] = config?.color || cat.color || "#cbd5e1";
    }
  });

  // Aggregate spending per cycle per category
  const cycleSpending: Record<string, Record<string, number>> = {};
  cycles.forEach((c) => {
    cycleSpending[c.id] = {};
  });

  (transactions || []).forEach((t) => {
    const catName = categoryNameMap[t.category_id] || t.category_id;
    if (!cycleSpending[t.cycle_id]) cycleSpending[t.cycle_id] = {};
    cycleSpending[t.cycle_id][catName] =
      (cycleSpending[t.cycle_id][catName] || 0) + t.amount;
  });

  // Collect all unique categories (sorted by total spending desc)
  const categoryTotals: Record<string, number> = {};
  Object.values(cycleSpending).forEach((catMap) => {
    Object.entries(catMap).forEach(([cat, amount]) => {
      categoryTotals[cat] = (categoryTotals[cat] || 0) + amount;
    });
  });

  const allCategories = Object.keys(categoryTotals).sort(
    (a, b) => categoryTotals[b] - categoryTotals[a]
  );

  const monthlyData: MonthlySpending[] = cycles.map((c) => ({
    cycleId: c.id,
    cycleName: c.name,
    startDate: c.start_date,
    categories: cycleSpending[c.id] || {},
  }));

  return {
    cycles: cycles.map((c) => ({
      id: c.id,
      name: c.name,
      startDate: c.start_date,
    })),
    categories: allCategories,
    categoryColors: categoryColorMap,
    monthlyData,
  };
}
