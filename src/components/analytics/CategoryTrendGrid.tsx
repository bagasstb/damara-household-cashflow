import type { CategorySpending } from "@/types";
import { getCategoryConfig } from "@/lib/utils/constants";
import { formatCompact } from "@/lib/utils/formatCurrency";

interface CategoryTrendGridProps {
  spending: CategorySpending[];
}

export default function CategoryTrendGrid({ spending }: CategoryTrendGridProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {spending.map((s) => {
        const config = getCategoryConfig(s.category);
        const Icon = config?.icon;
        const isUp = s.trend === "up";
        const isStable = s.trend === "stable";

        return (
          <div
            key={s.category}
            className="hover-card p-4 bg-white dark:bg-dark-surface rounded-2xl border border-slate-100 dark:border-white/5 flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              {config && Icon && (
                <div
                  className={`w-8 h-8 rounded-lg ${config.bgLight} ${config.bgDark} flex items-center justify-center ${config.textLight}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              )}
              <span
                className={`text-[10px] font-black ${
                  isUp
                    ? "text-rose-500"
                    : isStable
                    ? "text-emerald-500"
                    : "text-emerald-500"
                }`}
              >
                {s.trend_value}
              </span>
            </div>
            <div className="text-[10px] font-black text-secondary uppercase tracking-wider">
              {s.category}
            </div>
            <div className="text-sm font-black">
              Rp {formatCompact(s.total_spent)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
