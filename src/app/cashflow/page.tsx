import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ReceiptText } from "lucide-react";
import { getDashboardData, getAllCycles } from "@/lib/services";
import CashflowAllTransactions from "@/components/cashflow/CashflowAllTransactions";
import CycleSelectorDropdown from "@/components/cashflow/CycleSelectorDropdown";
import ImportFromSheetButton from "@/components/cashflow/ImportFromSheetButton";

// Cycle IDs that have a corresponding Google Sheet tab and can be synced
const SYNCABLE_CYCLE_IDS = new Set([
  "adf25554-3000-45d2-b4c7-32af8ac7d4d1", // Januari
  "c53e05a8-27b2-4d56-a070-664dc2d88701", // Februari
  "23bbf648-9c4c-4c6e-821f-cd9f5eac5d21", // Maret
  "cbe90e1c-a803-4693-be84-e1d7cee2948f", // April
  "ba4003dc-79ec-4e44-8978-3fade9551ed2", // Mei
  "d55ad3d8-d395-432b-b265-d622fd5bbd2b", // Juni
]);

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

  const canSync = cycle ? SYNCABLE_CYCLE_IDS.has(cycle.id) : false;

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

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 pb-24 md:pb-8 space-y-6">
        {/* Import from Google Sheet — only for syncable cycles */}
        {canSync && (
          <div className="bg-white dark:bg-dark-surface rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-sm font-black tracking-tight">Import dari Google Sheet</h2>
                <p className="text-[11px] text-secondary dark:text-slate-400 font-bold mt-0.5">
                  Sync data baru dari sheet Januari – April. Duplikat otomatis dilewati.
                </p>
              </div>
              <ImportFromSheetButton />
            </div>
          </div>
        )}

        {/* Transaction List */}
        <CashflowAllTransactions transactions={transactions} />
      </main>
    </div>
  );
}
