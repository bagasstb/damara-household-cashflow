import { PiggyBank, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import type { MonthlyTotal } from "@/types/saving";

interface SavingYearSummaryProps {
  year: number;
  monthlyTotals: MonthlyTotal[];
  goalCount: number;
}

export default function SavingYearSummary({
  year,
  monthlyTotals,
  goalCount,
}: SavingYearSummaryProps) {
  const latestTotal =
    monthlyTotals.length > 0
      ? monthlyTotals[monthlyTotals.length - 1].total
      : 0;

  // Calculate trend from first to latest month
  const firstTotal = monthlyTotals.length > 0 ? monthlyTotals[0].total : 0;
  const changePercent =
    firstTotal > 0
      ? Math.round(((latestTotal - firstTotal) / firstTotal) * 100)
      : 0;

  const isPositive = changePercent > 0;
  const isNeutral = changePercent === 0;

  return (
    <div className="bg-white dark:bg-dark-surface rounded-[2rem] p-6 md:p-8 border border-slate-200 dark:border-white/5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/10 rounded-2xl flex items-center justify-center">
            <PiggyBank className="w-6 h-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight">
              Saving Scheme {year}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {goalCount} investment goals
            </p>
          </div>
        </div>

        {/* Trend badge */}
        {!isNeutral && (
          <div
            className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black ${
              isPositive
                ? "bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                : "bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-400"
            }`}
          >
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5" />
            )}
            {isPositive ? "+" : ""}
            {changePercent}% YTD
          </div>
        )}
        {isNeutral && (
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-black bg-slate-100 dark:bg-white/5 text-slate-500">
            <Minus className="w-3.5 h-3.5" />
            No change
          </div>
        )}
      </div>

      <div className="mt-4">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          Latest Portfolio Value
        </span>
        <p className="text-3xl md:text-4xl font-mono font-black tracking-tighter text-slate-900 dark:text-white mt-1">
          Rp {formatCurrency(latestTotal)}
        </p>
      </div>
    </div>
  );
}
