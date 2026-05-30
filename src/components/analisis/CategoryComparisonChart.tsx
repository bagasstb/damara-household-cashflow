"use client";

import { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import type { CategoryComparisonData } from "@/lib/analisis-services";
import { formatCurrency } from "@/lib/utils/formatCurrency";

interface Props {
  data: CategoryComparisonData;
}

type ChartType = "bar" | "line";

const FALLBACK_COLORS = [
  "#6366F1","#F59E0B","#10B981","#F97316","#64748B",
  "#8B5CF6","#EC4899","#EF4444","#0284C7","#0D9488",
  "#3B82F6","#9D174D","#14B8A6","#F43F5E","#06B6D4",
];

// Custom tooltip
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-2xl p-4 shadow-2xl min-w-[200px]">
      <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-3">{label}</p>
      {payload
        .filter((p: any) => p.value > 0)
        .sort((a: any, b: any) => b.value - a.value)
        .map((p: any) => (
          <div key={p.name} className="flex items-center justify-between gap-6 mb-1.5">
            <div className="flex items-center gap-2">
              <div
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: p.color }}
              />
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">{p.name}</span>
            </div>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              Rp {formatCurrency(p.value)}
            </span>
          </div>
        ))}
    </div>
  );
}

export default function CategoryComparisonChart({ data }: Props) {
  const { categories, categoryColors, monthlyData } = data;

  const DEFAULT_CATEGORIES = ["Belanja", "Dinner", "Lunch", "Bfast"];
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(() => {
    const defaults = DEFAULT_CATEGORIES.filter((c) => categories.includes(c));
    return new Set(defaults.length > 0 ? defaults : categories.slice(0, 4));
  });
  const [chartType, setChartType] = useState<ChartType>("bar");

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) {
        if (next.size === 1) return prev; // minimal 1 kategori
        next.delete(cat);
      } else {
        next.add(cat);
      }
      return next;
    });
  };

  const selectAll = () => setSelectedCategories(new Set(categories));
  const clearAll = () => setSelectedCategories(new Set(categories.slice(0, 1)));

  // Chart data: setiap entry = 1 cycle (bulan)
  const chartData = useMemo(() => {
    return monthlyData.map((m) => {
      const entry: Record<string, any> = { name: m.cycleName };
      categories.forEach((cat) => {
        if (selectedCategories.has(cat)) {
          entry[cat] = m.categories[cat] || 0;
        }
      });
      return entry;
    });
  }, [monthlyData, categories, selectedCategories]);

  const selectedCats = categories.filter((c) => selectedCategories.has(c));

  return (
    <div className="space-y-6">
      {/* Chart Type Toggle */}
      <div className="flex items-center gap-2">
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Tampilan</span>
        <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 gap-1">
          {(["bar", "line"] as ChartType[]).map((type) => (
            <button
              key={type}
              onClick={() => setChartType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-tight transition-all ${
                chartType === type
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              }`}
            >
              {type === "bar" ? "Batang" : "Garis"}
            </button>
          ))}
        </div>
      </div>

      {/* Category Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">
            Pilih Kategori
          </span>
          <div className="flex gap-2">
            <button
              onClick={selectAll}
              className="text-[10px] font-black uppercase tracking-tight text-primary hover:text-primary/80 transition-colors"
            >
              Semua
            </button>
            <span className="text-slate-300 dark:text-slate-600">·</span>
            <button
              onClick={clearAll}
              className="text-[10px] font-black uppercase tracking-tight text-slate-400 hover:text-slate-600 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, i) => {
            const color = categoryColors[cat] || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
            const active = selectedCategories.has(cat);
            return (
              <button
                key={cat}
                onClick={() => toggleCategory(cat)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black transition-all border ${
                  active
                    ? "border-transparent text-white shadow-md scale-[1.02]"
                    : "border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 bg-white dark:bg-dark-surface hover:border-slate-300 dark:hover:border-white/20"
                }`}
                style={active ? { background: color } : {}}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ background: active ? "rgba(255,255,255,0.6)" : color }}
                />
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-[380px]">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === "bar" ? (
            <BarChart
              data={chartData}
              margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
              barCategoryGap="20%"
              barGap={2}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="opacity-10"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fontWeight: 800, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                tick={{ fontSize: 10, fontWeight: 700, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99,102,241,0.05)" }} />
              <Legend
                wrapperStyle={{ fontSize: 10, fontWeight: 800, paddingTop: 12 }}
                iconType="circle"
                iconSize={8}
              />
              {selectedCats.map((cat, i) => (
                <Bar
                  key={cat}
                  dataKey={cat}
                  fill={categoryColors[cat] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                  radius={[4, 4, 0, 0]}
                  maxBarSize={28}
                />
              ))}
            </BarChart>
          ) : (
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 8, left: 8, bottom: 4 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="currentColor"
                className="opacity-10"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fontWeight: 800, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${Math.round(v / 1000)}k`}
                tick={{ fontSize: 10, fontWeight: 700, fill: "currentColor" }}
                tickLine={false}
                axisLine={false}
                width={48}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 10, fontWeight: 800, paddingTop: 12 }}
                iconType="circle"
                iconSize={8}
              />
              {selectedCats.map((cat, i) => (
                <Line
                  key={cat}
                  type="monotone"
                  dataKey={cat}
                  stroke={categoryColors[cat] || FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              ))}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Summary table */}
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-slate-100 dark:border-white/5">
              <th className="text-left font-black uppercase tracking-widest text-slate-400 py-2 pr-4 min-w-[120px]">
                Kategori
              </th>
              {monthlyData.map((m) => (
                <th
                  key={m.cycleId}
                  className="text-right font-black uppercase tracking-widest text-slate-400 py-2 px-3 min-w-[80px]"
                >
                  {m.cycleName.split(" ")[0]}
                </th>
              ))}
              <th className="text-right font-black uppercase tracking-widest text-slate-400 py-2 pl-3 min-w-[90px]">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedCats.map((cat, i) => {
              const color = categoryColors[cat] || FALLBACK_COLORS[i % FALLBACK_COLORS.length];
              const total = monthlyData.reduce(
                (s, m) => s + (m.categories[cat] || 0),
                0
              );
              return (
                <tr
                  key={cat}
                  className="border-b border-slate-50 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="py-2.5 pr-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <span className="font-bold text-slate-700 dark:text-slate-300">{cat}</span>
                    </div>
                  </td>
                  {monthlyData.map((m) => {
                    const val = m.categories[cat] || 0;
                    return (
                      <td
                        key={m.cycleId}
                        className={`text-right py-2.5 px-3 font-bold tabular-nums ${
                          val === 0
                            ? "text-slate-300 dark:text-slate-600"
                            : "text-slate-700 dark:text-slate-200"
                        }`}
                      >
                        {val === 0 ? "—" : `${Math.round(val / 1000)}k`}
                      </td>
                    );
                  })}
                  <td className="text-right py-2.5 pl-3 font-black text-slate-900 dark:text-white tabular-nums">
                    Rp {formatCurrency(total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
