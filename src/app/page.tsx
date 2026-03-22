import Header from "@/components/layout/Header";
import MobileNav from "@/components/layout/MobileNav";
import StatsOverview from "@/components/dashboard/StatsOverview";
import DailyCashflow from "@/components/dashboard/DailyCashflow";
import QuickEntryForm from "@/components/dashboard/QuickEntryForm";
import CategoryAnalytics from "@/components/analytics/CategoryAnalytics";
import BudgetLimits from "@/components/budget/BudgetLimits";
import ReimburseList from "@/components/dashboard/ReimburseList";
import { getDashboardData, getAllCycles } from "@/lib/services";

export default async function Home({ searchParams }: { searchParams: Promise<{ cycle?: string }> }) {
  const params = await searchParams;
  const cycleId = params.cycle;
  
  const [dashboardData, allCycles] = await Promise.all([
    getDashboardData(cycleId),
    getAllCycles(),
  ]);

  const { cycle, summary, transactions, budgets, spending } = dashboardData;

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
