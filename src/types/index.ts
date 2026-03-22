// ===== Database / Domain Types =====

export interface Cycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  savings_target: number;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  sort_order: number;
}

export interface BudgetLimit {
  id: string;
  cycle_id: string;
  category_id: string;
  label: string;
  limit_amount: number;
  // Joined fields
  category?: Category;
  spent?: number;
}

export interface Transaction {
  id: string;
  cycle_id: string;
  category_id: string;
  date: string;
  description: string;
  amount: number;
  channel: string;
  cost_type: 
    | "fixed" 
    | "variable"
    | "fixed cost"
    | "expense cost"
    | "urgent cost"
    | "gift (family)"
    | "gift (others)"
    | "tabungan rumah"
    | "tabungan anak"
    | "tabungan couple"
    | "tabungan"
    | "household maintenance";
  is_reimbursable: boolean;
  is_transferred: boolean;
  created_at: string;
  // Joined fields
  category?: Category;
}

// ===== Analytics Types =====

export interface CategorySpending {
  category: string;
  icon: string;
  color: string;
  total_spent: number;
  percentage: number;
  tx_count: number;
  trend?: string;
  trend_value?: string;
}

export interface CycleSummary {
  total_spent: number;
  remaining_budget: number;
  fixed_costs: number;
  savings_target: number;
  savings_progress: number;
  fixed_percentage: number;
  expense_costs: number;
  expense_percentage: number;
  comparison_text?: string;
}

// ===== Form Types =====

export interface TransactionFormData {
  amount: number;
  description: string;
  category: string;
  channel: string;
  cost_type: string;
  is_reimbursable: boolean;
  date?: string;
}
