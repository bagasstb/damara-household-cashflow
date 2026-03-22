import { CreditCard, Lock, CheckCircle, ShoppingCart } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { CycleSummary } from "@/types";

interface StatsOverviewProps {
  summary: CycleSummary;
}

export default function StatsOverview({ summary }: StatsOverviewProps) {
  const budgetUsedPercent = Math.round(
    ((summary.total_spent) / (summary.total_spent + summary.remaining_budget)) * 100
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">

      {/* Total Spent */}
      <div className="hover-card bg-white dark:bg-dark-surface p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-secondary dark:text-slate-400 text-sm font-bold">
            Total Spent
          </span>
          <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-primary">
            <CreditCard className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-black text-secondary uppercase">
            Rp
          </span>
          <span className="text-2xl font-black dark:text-white tracking-tighter">
            {formatCurrency(summary.total_spent)}
          </span>
        </div>
        {summary.comparison_text && (
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold mt-2 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {summary.comparison_text}
          </p>
        )}
      </div>

      {/* Fixed Costs */}
      <div className="hover-card bg-white dark:bg-dark-surface p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-secondary dark:text-slate-400 text-sm font-bold">
            Fixed Costs
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-400">
            <Lock className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-black text-secondary uppercase">
            Rp
          </span>
          <span className="text-2xl font-black dark:text-white tracking-tighter">
            {formatCurrency(summary.fixed_costs)}
          </span>
        </div>
        <p className="text-[10px] text-secondary font-black uppercase tracking-wider mt-2">
          {summary.fixed_percentage}% of expenditure
        </p>
      </div>
      {/* Expense Costs */}
      <div className="hover-card bg-white dark:bg-dark-surface p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-white/5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-secondary dark:text-slate-400 text-sm font-bold">
            Expense Costs
          </span>
          <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center text-rose-500">
            <ShoppingCart className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-xs font-black text-secondary uppercase">
            Rp
          </span>
          <span className="text-2xl font-black dark:text-white tracking-tighter">
            {formatCurrency(summary.expense_costs)}
          </span>
        </div>
        <p className="text-[10px] text-secondary font-black uppercase tracking-wider mt-2">
          {summary.expense_percentage}% of expenditure
        </p>
      </div>
    </div>
  );
}
