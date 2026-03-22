import { ArrowUpRight } from "lucide-react";

export default function TrendInsights() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl border border-slate-100 dark:border-white/10">
        <div className="text-[9px] font-black text-secondary uppercase tracking-wider mb-2">
          Weekly Trend
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-lg font-black text-rose-500">+12%</span>
          <ArrowUpRight className="w-4 h-4 text-rose-500" />
        </div>
        <div className="text-[10px] font-bold text-slate-400 mt-1">
          vs last week
        </div>
      </div>

      <div className="bg-white dark:bg-dark-surface p-5 rounded-3xl border border-slate-100 dark:border-white/10">
        <div className="text-[9px] font-black text-secondary uppercase tracking-wider mb-2">
          Daily Avg
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-[10px] font-black text-secondary">Rp</span>
          <span className="text-lg font-black">218k</span>
        </div>
        <div className="text-[10px] font-bold text-emerald-500 mt-1">
          On Track
        </div>
      </div>
    </div>
  );
}
