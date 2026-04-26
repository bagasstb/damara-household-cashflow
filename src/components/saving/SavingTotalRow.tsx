import { MONTH_LABELS } from "@/types/saving";
import type { MonthlyTotal } from "@/types/saving";
import { formatCompact } from "@/lib/utils/formatCurrency";

interface SavingTotalRowProps {
  monthlyTotals: MonthlyTotal[];
}

export default function SavingTotalRow({
  monthlyTotals,
}: SavingTotalRowProps) {
  // Build a map for quick lookup
  const totalByMonth: Record<number, number> = {};
  monthlyTotals.forEach((mt) => {
    totalByMonth[mt.month] = mt.total;
  });

  return (
    <div className="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-500/5 dark:to-purple-500/5 rounded-2xl border border-violet-200 dark:border-violet-500/20 overflow-hidden">
      <div className="px-4 md:px-5 py-3 border-b border-violet-200 dark:border-violet-500/20">
        <h4 className="text-sm font-black tracking-tight text-violet-700 dark:text-violet-300">
          Total Portfolio
        </h4>
      </div>

      <div className="overflow-x-auto no-scrollbar">
        <div className="flex min-w-max">
          {MONTH_LABELS.map((label, idx) => {
            const month = idx + 1;
            const total = totalByMonth[month];
            const hasData = total !== undefined;

            return (
              <div
                key={month}
                className="flex flex-col items-center px-3 py-3 min-w-[64px]"
              >
                <span className="text-[10px] font-bold text-violet-400 uppercase mb-1">
                  {label}
                </span>
                {hasData ? (
                  <span className="text-xs font-mono font-black text-violet-700 dark:text-violet-300">
                    {formatCompact(total)}
                  </span>
                ) : (
                  <span className="text-xs text-violet-300 dark:text-violet-600">
                    —
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
