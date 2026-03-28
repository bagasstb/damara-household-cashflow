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
import { THR_TOTAL } from "@/types/thr";
import { formatCurrency } from "@/lib/utils/formatCurrency";
import { Gift, ArrowRight, Sparkles } from "lucide-react";

export default async function Home({ searchParams }: { searchParams: Promise<{ cycle?: string }> }) {
  const params = await searchParams;
  const cycleId = params.cycle;
  
  const [dashboardData, allCycles, thrSpending] = await Promise.all([
    getDashboardData(cycleId),
    getAllCycles(),
    getThrSpending(),
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
        {/* THR Banner */}
        <Link href="/thr" className="block group">
          <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 p-5 md:p-6 rounded-[2rem] shadow-lg shadow-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/30 transition-all hover:scale-[1.01] active:scale-[0.99] cursor-pointer">
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-4 right-1/4 w-16 h-16 bg-white/5 rounded-full blur-lg" />
            <Sparkles className="absolute top-4 right-16 w-4 h-4 text-white/30 animate-pulse" />
            <Sparkles className="absolute bottom-3 right-8 w-3 h-3 text-white/20 animate-pulse delay-700" />

            <div className="relative z-10 flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-white font-black text-sm md:text-base tracking-tight">
                    THR 2026
                  </h3>
                  <span className="px-2 py-0.5 bg-white/20 rounded-full text-[10px] font-black text-white/90 uppercase tracking-wider">
                    {thrUsedPercent}% terpakai
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white/60 text-xs font-bold">Sisa</span>
                  <span className="text-white font-mono font-black text-lg md:text-xl tracking-tighter">
                    Rp {formatCurrency(Math.abs(thrRemaining))}
                  </span>
                </div>
                {/* Mini progress bar */}
                <div className="w-full h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden max-w-xs">
                  <div
                    className="h-full bg-white rounded-full transition-all duration-1000"
                    style={{ width: `${thrUsedPercent}%` }}
                  />
                </div>
              </div>

              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shrink-0 group-hover:bg-white/30 transition-all">
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </Link>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Left Column: Daily Cashflow & Analytics */}
          <div className="lg:col-span-8 space-y-8">
            <BudgetLimits budgets={budgets} />
            <DailyCashflow transactions={transactions} />
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
