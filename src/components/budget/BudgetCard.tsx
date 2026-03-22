import type { BudgetLimit } from "@/types";
import { formatCurrency, formatCompact } from "@/lib/utils/formatCurrency";

interface BudgetCardProps {
  budget: BudgetLimit;
}

export default function BudgetCard({ budget }: BudgetCardProps) {
  const spent = budget.spent ?? 0;
  const remaining = budget.limit_amount - spent;
  const isOverLimit = remaining < 0;
  const percentage = Math.min(100, Math.round((spent / budget.limit_amount) * 100));

  return (
    <div
      className={`hover-card bg-white dark:bg-dark-surface p-4 sm:p-5 rounded-3xl shadow-sm border ${
        isOverLimit
          ? "border-rose-100 dark:border-rose-500/20"
          : "border-slate-100 dark:border-white/5"
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-xs sm:text-sm font-black dark:text-white leading-none">
            {budget.label}
          </h3>
          <p
            className={`flex items-baseline gap-1 mt-1.5 ${
              isOverLimit
                ? "text-rose-500"
                : "text-emerald-600 dark:text-emerald-400"
            }`}
          >
            {isOverLimit ? (
              <>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase">Over by</span>
                <span className="text-sm sm:text-base font-black tracking-tighter">
                  {formatCompact(Math.abs(remaining))}
                </span>
              </>
            ) : (
              <>
                <span className="text-sm sm:text-base font-black tracking-tighter leading-none">
                  Rp {formatCurrency(remaining)}
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase">Avail</span>
              </>
            )}
          </p>
        </div>
        <div className="text-right">
          <div
            className={`text-sm font-mono font-black tracking-tighter leading-none ${
              isOverLimit ? "text-rose-500" : ""
            }`}
          >
            {formatCurrency(spent)}
          </div>
          <div
            className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-1 ${
              isOverLimit
                ? "text-rose-400"
                : "text-secondary dark:text-slate-400"
            }`}
          >
            Limit {formatCompact(budget.limit_amount)}
          </div>
        </div>
      </div>

      <div
        className={`relative h-2 w-full rounded-full overflow-hidden ${
          isOverLimit
            ? "bg-rose-50 dark:bg-rose-900/20"
            : "bg-slate-100 dark:bg-slate-900"
        }`}
      >
        <div
          className={`absolute left-0 top-0 h-full rounded-full ${
            isOverLimit
              ? "bg-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.5)]"
              : "bg-primary shadow-[0_0_8px_rgba(37,99,235,0.4)]"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
