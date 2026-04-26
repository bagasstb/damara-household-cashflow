"use client";

import { useState } from "react";
import {
  Sprout,
  TrendingUp,
  Wallet,
  Landmark,
  CreditCard,
  DollarSign,
  Banknote,
  Bitcoin,
  Gem,
  Coins,
  WalletCards,
  PiggyBank,
  Pencil,
  BarChart3,
  ChevronUp,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { SavingGoal } from "@/types/saving";
import { MONTH_LABELS, INSTRUMENT_ICONS } from "@/types/saving";
import { formatCompact, formatCurrency } from "@/lib/utils/formatCurrency";
import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Sprout,
  TrendingUp,
  Wallet,
  Landmark,
  CreditCard,
  DollarSign,
  Banknote,
  Bitcoin,
  Gem,
  Coins,
  WalletCards,
  PiggyBank,
};

function GoalTooltip({ active, payload, label }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-xl px-3 py-2 shadow-xl">
      <p className="text-[10px] font-black text-slate-400 uppercase">{label}</p>
      <p className="text-xs font-mono font-black text-slate-900 dark:text-white">
        Rp {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
}

interface GoalCardProps {
  goal: SavingGoal;
  isChild?: boolean;
  onEdit: (goalId: string, goalName: string, instrument: string, month: number, currentAmount: number) => void;
}

export default function GoalCard({ goal, isChild = false, onEdit }: GoalCardProps) {
  const [showChart, setShowChart] = useState(false);

  const iconConfig = INSTRUMENT_ICONS[goal.instrument];
  const IconComponent = ICON_MAP[goal.icon] || PiggyBank;
  const iconColor = iconConfig?.color || "#8b5cf6";

  // Get the latest entry with data
  const latestEntry = goal.entries
    ?.filter((e) => e.amount > 0)
    .sort((a, b) => b.month - a.month)[0];

  // Build chart data from entries
  const chartData = MONTH_LABELS.map((label, idx) => {
    const entry = goal.entries?.find((e) => e.month === idx + 1);
    return {
      month: label,
      amount: entry ? Number(entry.amount) : null,
    };
  }).filter((d) => d.amount !== null);

  const hasChartData = chartData.length >= 2;

  return (
    <div
      className={`bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden transition-all hover:border-violet-200 dark:hover:border-violet-500/20 ${
        isChild ? "ml-6 md:ml-8" : ""
      }`}
    >
      {/* Header */}
      <div className="px-4 md:px-5 py-3 md:py-4 flex items-center gap-3 border-b border-slate-100 dark:border-white/5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ backgroundColor: `${iconColor}15` }}
        >
          <IconComponent
            className="w-4.5 h-4.5"
            style={{ color: iconColor }}
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-black tracking-tight truncate">
            {isChild ? goal.instrument : goal.name}
          </h4>
          <span
            className="text-[10px] font-bold uppercase tracking-wider"
            style={{ color: iconColor }}
          >
            {goal.instrument}
          </span>
        </div>

        {/* Chart toggle button */}
        {hasChartData && (
          <button
            onClick={() => setShowChart(!showChart)}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
              showChart
                ? "bg-violet-100 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400"
                : "bg-slate-100 dark:bg-white/5 text-slate-400 hover:text-violet-500 hover:bg-violet-50 dark:hover:bg-violet-500/10"
            }`}
            title="Toggle chart"
          >
            {showChart ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <BarChart3 className="w-4 h-4" />
            )}
          </button>
        )}

        {latestEntry && (
          <div className="text-right shrink-0">
            <span className="text-xs text-slate-500 dark:text-slate-400 font-bold">
              Latest
            </span>
            <p className="text-sm font-mono font-black tracking-tight">
              {formatCompact(latestEntry.amount)}
            </p>
          </div>
        )}
      </div>

      {/* Inline Chart (expanded) */}
      {showChart && hasChartData && (
        <div className="px-4 md:px-5 py-4 border-b border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/[0.02]">
          <div className="w-full h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <defs>
                  <linearGradient id={`goalGrad-${goal.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={iconColor} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={iconColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="currentColor"
                  className="text-slate-100 dark:text-white/5"
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 10, fontWeight: 800, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 9, fontWeight: 700, fill: "#94a3b8" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => formatCompact(v)}
                />
                <Tooltip content={<GoalTooltip />} />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke={iconColor}
                  strokeWidth={2.5}
                  fill={`url(#goalGrad-${goal.id})`}
                  dot={{ r: 3, fill: iconColor, strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 5, fill: iconColor, strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Monthly values - horizontal scroll */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex min-w-max">
          {MONTH_LABELS.map((label, idx) => {
            const month = idx + 1;
            const entry = goal.entries?.find((e) => e.month === month);
            const hasData = entry && entry.amount > 0;
            const isEmpty = !entry;
            const isLatest = entry && latestEntry && entry.month === latestEntry.month;

            return (
              <button
                key={month}
                onClick={() =>
                  onEdit(
                    goal.id,
                    isChild ? goal.instrument : goal.name,
                    goal.instrument,
                    month,
                    entry?.amount || 0
                  )
                }
                className={`group flex flex-col items-center px-3 py-3 min-w-[64px] transition-all cursor-pointer hover:bg-violet-50 dark:hover:bg-violet-500/5 ${
                  isLatest
                    ? "bg-violet-50 dark:bg-violet-500/10"
                    : ""
                }`}
              >
                <span className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                  {label}
                </span>
                {hasData ? (
                  <span
                    className={`text-xs font-mono font-black ${
                      isLatest
                        ? "text-violet-600 dark:text-violet-400"
                        : "text-slate-700 dark:text-slate-300"
                    }`}
                  >
                    {formatCompact(entry.amount)}
                  </span>
                ) : isEmpty ? (
                  <span className="text-xs text-slate-300 dark:text-slate-600">
                    —
                  </span>
                ) : (
                  <span className="text-xs font-mono font-bold text-slate-400">
                    0
                  </span>
                )}
                <Pencil className="w-3 h-3 text-slate-300 dark:text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Children (sub-instruments) */}
      {goal.children && goal.children.length > 0 && (
        <div className="border-t border-slate-100 dark:border-white/5 space-y-0">
          {goal.children.map((child) => (
            <GoalCard key={child.id} goal={child} isChild onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
}
