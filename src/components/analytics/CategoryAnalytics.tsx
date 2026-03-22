"use client";

import type { CategorySpending, CycleSummary } from "@/types";
import DonutChart from "./DonutChart";
import TopCategory from "./TopCategory";
import TrendInsights from "./TrendInsights";
import CategoryTrendGrid from "./CategoryTrendGrid";
import StatsOverview from "../dashboard/StatsOverview";

interface CategoryAnalyticsProps {
  spending: CategorySpending[];
  summary: CycleSummary;
}

export default function CategoryAnalytics({ spending, summary }: CategoryAnalyticsProps) {
  const topCategory = spending.length > 0 ? spending.reduce(
    (max, cat) => (cat.total_spent > max.total_spent ? cat : max),
    spending[0]
  ) : null;

  return (
    <div id="analytics-section" className="space-y-6 pt-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-8 bg-accent rounded-full" />
        <h2 className="text-2xl font-black tracking-tight">
          Category Analytics
        </h2>
      </div>

      <StatsOverview summary={summary} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DonutChart spending={spending} />

        <div className="space-y-4">
          <TopCategory category={topCategory} />
          <TrendInsights />
        </div>
      </div>

      <CategoryTrendGrid spending={spending} />
    </div>
  );
}
