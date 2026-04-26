import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import YearTabs from "@/components/saving/YearTabs";
import SavingYearSummary from "@/components/saving/SavingYearSummary";
import SavingChart from "@/components/saving/SavingChart";
import GoalCardList from "@/components/saving/GoalCardList";
import {
  getSavingGoalsByYear,
  getAvailableYears,
  calculateMonthlyTotals,
} from "@/lib/saving-services";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Saving Scheme ${year} — Household Cashflow`,
    description: `Track your household saving portfolio for ${year}.`,
  };
}

export default async function SavingYearPage({
  params,
}: {
  params: Promise<{ year: string }>;
}) {
  const { year: yearStr } = await params;
  const year = parseInt(yearStr, 10);

  const [goals, years] = await Promise.all([
    getSavingGoalsByYear(year),
    getAvailableYears(),
  ]);

  const monthlyTotals = calculateMonthlyTotals(goals);

  // Count all goals including children
  let goalCount = 0;
  goals.forEach((g) => {
    goalCount++;
    goalCount += g.children?.length || 0;
  });

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 flex flex-col selection:bg-violet-500/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-dark-bg/80 backdrop-blur-2xl border-b border-slate-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-lg font-black tracking-tight">
              Saving Scheme
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-violet-600 dark:text-violet-400">
              Household Portfolio Tracker
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-6 md:space-y-8 pb-8">
        {/* Year Tabs */}
        <YearTabs years={years} activeYear={year} />

        {/* Year Summary */}
        <SavingYearSummary
          year={year}
          monthlyTotals={monthlyTotals}
          goalCount={goalCount}
        />

        {/* Chart */}
        <SavingChart data={monthlyTotals} year={year} />

        {/* Goal Cards */}
        <GoalCardList
          goals={goals}
          monthlyTotals={monthlyTotals}
          year={year}
        />
      </main>
    </div>
  );
}
