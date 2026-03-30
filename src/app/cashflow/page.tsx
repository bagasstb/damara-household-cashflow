import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { getDashboardData, getAllCycles } from "@/lib/services";
import CashflowAllTransactions from "@/components/cashflow/CashflowAllTransactions";
import CycleSelectorDropdown from "@/components/cashflow/CycleSelectorDropdown";

export const metadata: Metadata = {
  title: "Riwayat Cashflow — Household Cashflow",
  description: "Lihat semua riwayat transaksi kasflow per siklus.",
};

export default async function CashflowPage({
  searchParams,
}: {
  searchParams: Promise<{ cycle?: string }>;
}) {
  const params = await searchParams;
  const cycleId = params.cycle;

  const [dashboardData, allCycles] = await Promise.all([
    getDashboardData(cycleId),
    getAllCycles(),
  ]);

  const { cycle, transactions } = dashboardData;

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 flex flex-col selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 h-16 flex items-center gap-4">
          <Link
            href={cycle ? `/?cycle=${cycle.id}` : "/"}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black tracking-tight leading-none">
              Riwayat Cashflow
            </h1>
            {cycle && (
              <p className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 mt-0.5">
                {cycle.name}
              </p>
            )}
          </div>

          {/* Cycle Switcher */}
          <div className="flex items-center gap-2">
            <ReceiptText className="w-4 h-4 text-secondary dark:text-slate-400 shrink-0" />
            <CycleSelectorDropdown
              cycles={allCycles}
              activeCycleId={cycle?.id ?? ""}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 pb-24 md:pb-8">
        <CashflowAllTransactions transactions={transactions} />
      </main>
    </div>
  );
}
