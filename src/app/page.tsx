import Link from "next/link";
import Header from "@/components/layout/Header";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DailyCashflow from "@/components/dashboard/DailyCashflow";
import QuickEntryForm from "@/components/dashboard/QuickEntryForm";
import CategoryAnalytics from "@/components/analytics/CategoryAnalytics";
import BudgetLimits from "@/components/budget/BudgetLimits";
import ReimburseList from "@/components/dashboard/ReimburseList";
import ImportMenuCard from "@/components/dashboard/ImportMenuCard";
import { getDashboardData, getAllCycles } from "@/lib/services";
import { getThrSpending } from "@/lib/thr-services";
import { getLatestSavingTotal } from "@/lib/saving-services";
import { THR_TOTAL } from "@/types/thr";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Gift, PiggyBank, BarChart3, Heart } from "lucide-react";

export default async function Home({ searchParams }: { searchParams: Promise<{ cycle?: string }> }) {
  const params = await searchParams;
  const cycleId = params.cycle;
  
  const [dashboardData, allCycles, thrSpending, savingTotal] = await Promise.all([
    getDashboardData(cycleId),
    getAllCycles(),
    getThrSpending(),
    getLatestSavingTotal(),
  ]);

  const { cycle, summary, transactions, budgets, spending } = dashboardData;
  const thrTotalSpent = thrSpending.reduce((s, i) => s + i.amount, 0);
  const thrRemaining = THR_TOTAL - thrTotalSpent;
  const thrUsedPercent = Math.min(Math.round((thrTotalSpent / THR_TOTAL) * 100), 100);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 flex-col gap-4">
        <Header cycles={allCycles as any} activeCycle={undefined} />
        <p className="text-slate-500 mt-20">No active cycle found. Please setup a cycle first.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 flex flex-col selection:bg-primary/20">
      <Header cycles={allCycles as any} activeCycle={cycle as any} />

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8 md:space-y-12 pb-8">
        {/* Quick Access Menu Cards — Analisis, Saving, THR, Ihya, Import */}
        <div className="grid grid-cols-5 gap-2.5 sm:gap-3 md:gap-4">
          {/* Analisis Card */}
          <Link href="/analisis" className="block group">
            <div className="bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-white/10 rounded-2xl md:rounded-[1.75rem] p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-primary/40 dark:hover:border-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-800 dark:text-white tracking-tight">
                Analisis
              </h3>
            </div>
          </Link>

          {/* Saving Card */}
          <Link href={savingTotal ? `/saving/${savingTotal.year}` : "/saving"} className="block group">
            <div className="bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-white/10 rounded-2xl md:rounded-[1.75rem] p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-violet-500/40 dark:hover:border-violet-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                <PiggyBank className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-800 dark:text-white tracking-tight">
                Saving
              </h3>
            </div>
          </Link>

          {/* THR Card */}
          <Link href="/thr" className="block group">
            <div className="bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-white/10 rounded-2xl md:rounded-[1.75rem] p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-emerald-500/40 dark:hover:border-emerald-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                <Gift className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-800 dark:text-white tracking-tight">
                THR
              </h3>
            </div>
          </Link>

          {/* Ihya Card */}
          <Link href="/ihya" className="block group">
            <div className="bg-white dark:bg-dark-surface border border-slate-200/80 dark:border-white/10 rounded-2xl md:rounded-[1.75rem] p-3 sm:p-4 md:p-5 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-500/40 dark:hover:border-blue-500/40 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-1.5 sm:mb-2 group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-black text-[11px] sm:text-xs md:text-sm text-slate-800 dark:text-white tracking-tight">
                Ihya
              </h3>
            </div>
          </Link>

          {/* Import Card */}
          <ImportMenuCard />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Left Column: Daily Cashflow & Analytics */}
          <div className="lg:col-span-8 space-y-8">
            <BudgetLimits budgets={budgets} />
            <DailyCashflow transactions={transactions} cycleId={cycle.id} />
            <CategoryAnalytics spending={spending} summary={summary} />
          </div>

          {/* Right Column: Quick Add & Budgets */}
          <div className="lg:col-span-4 space-y-8">
            <QuickEntryForm activeCycleId={cycle.id} />
            <ReimburseList transactions={transactions} />
          </div>
        </div>
      </main>
    </div>
  );
}
