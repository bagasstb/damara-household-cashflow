"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyTotal } from "@/types/saving";
import { formatCurrency, formatCompact } from "@/lib/utils/formatCurrency";

interface SavingChartProps {
  data: MonthlyTotal[];
  year: number;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-3 shadow-xl">
      <p className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
        {label}
      </p>
      <p className="text-base font-mono font-black text-slate-900 dark:text-white">
        Rp {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

export default function SavingChart({ data, year }: SavingChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white dark:bg-dark-surface rounded-[2rem] p-6 border border-slate-200 dark:border-white/5">
        <p className="text-center text-slate-400 py-12">
          No saving data for {year}
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-dark-surface rounded-[2rem] p-6 md:p-8 border border-slate-200 dark:border-white/5">
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-6">
        Monthly Portfolio Value
      </h3>

      <div className="w-full h-[280px] md:h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: -10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="savingGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-slate-100 dark:text-white/5"
              vertical={false}
            />
            <XAxis
              dataKey="monthLabel"
              tick={{ fontSize: 11, fontWeight: 800, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fontWeight: 700, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => formatCompact(v)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#8b5cf6"
              strokeWidth={3}
              fill="url(#savingGradient)"
              dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{
                r: 6,
                fill: "#8b5cf6",
                strokeWidth: 3,
                stroke: "#fff",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
