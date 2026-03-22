import { createClient } from "./supabase/server";
import type { 
  Transaction, 
  BudgetLimit, 
  CycleSummary, 
  CategorySpending 
} from "@/types";
import { getCategoryConfig } from "./utils/constants";

export async function getDashboardData(cycleId?: string) {
  const supabase = await createClient();

  // 1. Get active cycle (for now, simply get the newest cycle if no ID provided)
  let query = supabase.from("cycles").select("*");
  if (cycleId) {
    query = query.eq("id", cycleId);
  } else {
    query = query.order("start_date", { ascending: false }).limit(1);
  }
  
  const { data: cycles, error: cycleError } = await query;

  if (cycleError || !cycles || cycles.length === 0) {
    return {
      cycle: null,
      summary: null,
      transactions: [],
      budgets: [],
      spending: [],
    };
  }
  const cycle = cycles[0];

  // 2. Get budgets
  const { data: budgetsData } = await supabase
    .from("budget_limits")
    .select("*, category:categories(*)")
    .eq("cycle_id", cycle.id);

  // 3. Get transactions
  const { data: transactionsData } = await supabase
    .from("transactions")
    .select("*, category:categories(*)")
    .eq("cycle_id", cycle.id)
    .order("date", { ascending: false });

  // Map transactions manually mapping to correct types and category names
  const transactions: Transaction[] = (transactionsData || []).map((t) => ({
    id: t.id,
    cycle_id: t.cycle_id,
    category_id: t.category_id,
    date: new Date(t.date).toISOString().split('T')[0],
    description: t.description,
    amount: t.amount,
    channel: t.channel,
    cost_type: t.cost_type as any,
    is_reimbursable: Boolean(t.is_reimbursable),
    is_transferred: Boolean(t.is_transferred),
    created_at: t.created_at,
    category: t.category[0] || t.category, // Handle array/object difference based on Supabase relation
  }));

  // Calculate totals
  let totalSpent = 0;
  let fixedCosts = 0;
  let expenseCosts = 0;
  const categoryTotals: Record<string, number> = {};
  const categoryCounts: Record<string, number> = {};
  const categoryNameMap: Record<string, string> = {};

  transactions.forEach((t) => {
    totalSpent += t.amount;
    if (t.cost_type === "fixed" || t.cost_type === "fixed cost") {
      fixedCosts += t.amount;
    } else if (t.cost_type === "expense cost") {
      expenseCosts += t.amount;
    }

    if (!categoryTotals[t.category_id]) {
      categoryTotals[t.category_id] = 0;
      categoryCounts[t.category_id] = 0;
    }
    
    // Save the Category text name if available
    if (t.category?.name) {
       categoryNameMap[t.category_id] = t.category.name;
    } else {
       // fallback for seed data
       const capitalised = t.category_id.charAt(0).toUpperCase() + t.category_id.slice(1);
       categoryNameMap[t.category_id] = capitalised;
    }

    categoryTotals[t.category_id] += t.amount;
    categoryCounts[t.category_id] += 1;
  });
  
  const summary: CycleSummary = {
    total_spent: totalSpent,
    remaining_budget: cycle.savings_target - totalSpent,
    fixed_costs: fixedCosts,
    savings_target: cycle.savings_target,
    savings_progress: Math.min(Math.round(((cycle.savings_target - totalSpent) / cycle.savings_target) * 100), 100) || 0,
    fixed_percentage: totalSpent > 0 ? Math.round((fixedCosts / totalSpent) * 100) : 0,
    expense_costs: expenseCosts,
    expense_percentage: totalSpent > 0 ? Math.round((expenseCosts / totalSpent) * 100) : 0,
    comparison_text: "-12% vs last cycle", // Currently hardcoded mock
  };

  // Map budgets
  const budgets: BudgetLimit[] = (budgetsData || []).map((b) => ({
    id: b.id,
    cycle_id: b.cycle_id,
    category_id: b.category_id,
    label: b.label,
    limit_amount: b.limit_amount,
    spent: categoryTotals[b.category_id] || 0,
    category: b.category[0] || b.category,
  }));

  // Map spending array
  const spending: CategorySpending[] = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]) // Sort highest spending first
    .map(([catId, amount]) => {
      const catName = categoryNameMap[catId] || catId;
      const config = getCategoryConfig(catName);

      return {
        category: catName,
        icon: config?.icon.displayName?.toLowerCase() || catId, 
        color: config?.color || "#cbd5e1",
        total_spent: amount,
        percentage: totalSpent > 0 ? Math.round((amount / totalSpent) * 100) : 0,
        tx_count: categoryCounts[catId],
        trend: "stable",
        trend_value: "Stable",
      };
    });

  return {
    cycle,
    summary,
    transactions,
    budgets,
    spending,
  };
}

export async function getAllCycles() {
  const supabase = await createClient();
  const { data: cycles } = await supabase
    .from("cycles")
    .select("id, name, start_date, end_date")
    .order("start_date", { ascending: false });

  return cycles || [];
}
