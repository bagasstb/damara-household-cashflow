import { createClient } from "./supabase/server";
import type { SavingGoal, SavingEntry, MonthlyTotal } from "@/types/saving";
import { MONTH_LABELS } from "@/types/saving";

/**
 * Fetch all saving goals + entries for a given year.
 * Organizes parent/child relationships for grouped instruments.
 */
export async function getSavingGoalsByYear(year: number): Promise<SavingGoal[]> {
  const supabase = await createClient();

  // Fetch all goals for this year
  const { data: goalsData, error: goalsError } = await supabase
    .from("saving_goals")
    .select("*")
    .eq("year", year)
    .order("sort_order", { ascending: true });

  if (goalsError || !goalsData) {
    console.error("Error fetching saving goals:", goalsError);
    return [];
  }

  // Fetch all entries for this year
  const goalIds = goalsData.map((g) => g.id);

  // Guard: if no goals, skip entries query (empty .in() can hang)
  if (goalIds.length === 0) {
    return [];
  }

  const { data: entriesData, error: entriesError } = await supabase
    .from("saving_entries")
    .select("*")
    .in("goal_id", goalIds)
    .eq("year", year)
    .order("month", { ascending: true });

  if (entriesError) {
    console.error("Error fetching saving entries:", entriesError);
  }

  const entries: SavingEntry[] = (entriesData || []).map((e) => ({
    id: e.id,
    goal_id: e.goal_id,
    year: e.year,
    month: e.month,
    amount: Number(e.amount),
    note: e.note,
    created_at: e.created_at,
    updated_at: e.updated_at,
  }));

  // Map entries to goals
  const entriesByGoal: Record<string, SavingEntry[]> = {};
  entries.forEach((e) => {
    if (!entriesByGoal[e.goal_id]) entriesByGoal[e.goal_id] = [];
    entriesByGoal[e.goal_id].push(e);
  });

  // Build goal tree (parents with children)
  const goals: SavingGoal[] = goalsData.map((g) => ({
    id: g.id,
    year: g.year,
    name: g.name,
    instrument: g.instrument,
    icon: g.icon,
    parent_goal_id: g.parent_goal_id,
    sort_order: g.sort_order,
    created_at: g.created_at,
    entries: entriesByGoal[g.id] || [],
    children: [],
  }));

  // Organize into parent/child
  const parentGoals: SavingGoal[] = [];
  const childMap: Record<string, SavingGoal[]> = {};

  goals.forEach((g) => {
    if (g.parent_goal_id) {
      if (!childMap[g.parent_goal_id]) childMap[g.parent_goal_id] = [];
      childMap[g.parent_goal_id].push(g);
    } else {
      parentGoals.push(g);
    }
  });

  // Attach children to parents
  parentGoals.forEach((p) => {
    p.children = childMap[p.id] || [];
  });

  return parentGoals;
}

/**
 * Get distinct years that have saving data.
 */
export async function getAvailableYears(): Promise<number[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("saving_goals")
    .select("year")
    .order("year", { ascending: false });

  if (error || !data) return [];

  const years = [...new Set(data.map((d) => d.year))];
  return years;
}

/**
 * Calculate monthly totals for chart data.
 */
export function calculateMonthlyTotals(goals: SavingGoal[]): MonthlyTotal[] {
  const totals: MonthlyTotal[] = [];

  for (let m = 1; m <= 12; m++) {
    let total = 0;
    let hasData = false;

    const addGoalEntries = (goal: SavingGoal) => {
      const entry = goal.entries?.find((e) => e.month === m);
      if (entry) {
        total += entry.amount;
        hasData = true;
      }
      // Add children entries too
      goal.children?.forEach(addGoalEntries);
    };

    goals.forEach(addGoalEntries);

    if (hasData) {
      totals.push({
        month: m,
        monthLabel: MONTH_LABELS[m - 1],
        total,
      });
    }
  }

  return totals;
}

/**
 * Get latest total for the home banner card.
 */
export async function getLatestSavingTotal(): Promise<{
  year: number;
  total: number;
  goalCount: number;
} | null> {
  const years = await getAvailableYears();
  if (years.length === 0) return null;

  const currentYear = years[0]; // Most recent year
  const goals = await getSavingGoalsByYear(currentYear);
  if (goals.length === 0) return null;

  const monthlyTotals = calculateMonthlyTotals(goals);
  const latestTotal = monthlyTotals.length > 0
    ? monthlyTotals[monthlyTotals.length - 1].total
    : 0;

  // Count all goals including children
  let goalCount = 0;
  goals.forEach((g) => {
    goalCount++;
    goalCount += (g.children?.length || 0);
  });

  return { year: currentYear, total: latestTotal, goalCount };
}
