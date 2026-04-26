import Link from "next/link";
import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DailyCashflow from "@/components/dashboard/DailyCashflow";
import QuickEntryForm from "@/components/dashboard/QuickEntryForm";
import CategoryAnalytics from "@/components/analytics/CategoryAnalytics";
import BudgetLimits from "@/components/budget/BudgetLimits";
import ReimburseList from "@/components/dashboard/ReimburseList";
import { getDashboardData, getAllCycles } from "@/lib/services";
import { getThrSpending } from "@/lib/thr-services";
import { getLatestSavingTotal } from "@/lib/saving-services";
import { THR_TOTAL } from "@/types/thr";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Gift, ArrowRight, PiggyBank } from "lucide-react";

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

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8 md:space-y-12 pb-24 md:pb-8">
        {/* Quick Access Banners — THR & Saving */}
        <div className="grid grid-cols-2 gap-3 md:gap-4">
          {/* THR Card */}
          <Link href="/thr" className="block group">
            <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-500 p-4 md:p-5 rounded-2xl md:rounded-[2rem] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Gift className="w-4.5 h-4.5 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-white font-black text-xs md:text-sm tracking-tight">
                  THR 2026
                </h3>
                <p className="text-white font-mono font-black text-base md:text-lg tracking-tighter mt-0.5">
                  Rp {formatCurrency(Math.abs(thrRemaining))}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-1000"
                      style={{ width: `${thrUsedPercent}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-white/70">
                    {thrUsedPercent}%
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Saving Card */}
          <Link href={savingTotal ? `/saving/${savingTotal.year}` : "/saving"} className="block group">
            <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 to-purple-500 p-4 md:p-5 rounded-2xl md:rounded-[2rem] shadow-lg shadow-violet-500/20 hover:shadow-xl hover:shadow-violet-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer">
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <PiggyBank className="w-4.5 h-4.5 text-white" />
                  </div>
                  <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-white/80 group-hover:translate-x-0.5 transition-all" />
                </div>
                <h3 className="text-white font-black text-xs md:text-sm tracking-tight">
                  Saving {savingTotal?.year ?? new Date().getFullYear()}
                </h3>
                <p className="text-white font-mono font-black text-base md:text-lg tracking-tighter mt-0.5">
                  Rp {formatCurrency(savingTotal?.total ?? 0)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[10px] font-black text-white/70 bg-white/15 px-2 py-0.5 rounded-full">
                    {savingTotal?.goalCount ?? 0} goals
                  </span>
                </div>
              </div>
            </div>
          </Link>
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

      <MobileNav />
    </div>
  );
}
