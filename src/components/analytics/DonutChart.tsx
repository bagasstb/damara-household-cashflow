import type { CategorySpending } from "@/types";

interface DonutChartProps {
  spending: CategorySpending[];
}

export default function DonutChart({ spending }: DonutChartProps) {
  // Calculate donut segments
  const circumference = 282.6; // 2 * PI * 45
  let cumulativeAngle = -90; // Start from top

  const segments = spending
    .filter((s) => s.percentage > 0)
    .slice(0, 4) // Top 4 categories for chart
    .map((s) => {
      const angle = (s.percentage / 100) * 360;
      const offset = circumference - (s.percentage / 100) * circumference;
      const rotation = cumulativeAngle;
      cumulativeAngle += angle;

      return {
        ...s,
        offset,
        rotation,
      };
    });

  return (
    <div className="bg-white dark:bg-dark-surface p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-white/10">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-black dark:text-white uppercase tracking-wider">
          Spending Breakdown
        </h3>
        <div className="text-[10px] font-black text-secondary">
          JAN 23 - FEB 24
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Chart */}
        <div className="relative flex items-center justify-center">
          <svg width="120" height="120" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="10"
              className="dark:stroke-slate-800"
            />
            {/* Segments */}
            {segments.map((seg, i) => (
              <circle
                key={i}
                cx="50"
                cy="50"
                r="45"
                fill="transparent"
                stroke={seg.color}
                strokeWidth="10"
                className="donut-segment"
                strokeDasharray={circumference}
                style={{
                  "--offset": seg.offset,
                  strokeDashoffset: seg.offset,
                  animationDelay: `${i * 0.15}s`,
                } as React.CSSProperties}
                transform={`rotate(${seg.rotation} 50 50)`}
              />
            ))}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xs font-black uppercase text-secondary leading-none">
              Total
            </span>
            <span className="text-lg font-black tracking-tight">100%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3 w-full">
          {spending.slice(0, 4).map((s) => (
            <div key={s.category} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-xs font-bold">{s.category}</span>
              </div>
              <span className="text-xs font-black">{s.percentage}%</span>
            </div>
          ))}
          {/* Others */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-700" />
              <span className="text-xs font-bold">Others</span>
            </div>
            <span className="text-xs font-black">
              {100 - spending.slice(0, 4).reduce((sum, s) => sum + s.percentage, 0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
