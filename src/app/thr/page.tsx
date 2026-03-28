import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ThrQuotaCard from "@/components/thr/ThrQuotaCard";
import ThrEntryForm from "@/components/thr/ThrEntryForm";
import ThrSpendingList from "@/components/thr/ThrSpendingList";
import { getThrSpending } from "@/lib/thr-services";

export const metadata: Metadata = {
  title: "THR Management — Household Cashflow",
  description: "Track and manage your Tunjangan Hari Raya (THR) spending.",
};

export default async function ThrPage() {
  const spending = await getThrSpending();
  const totalSpent = spending.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 flex flex-col selection:bg-emerald-500/20">
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
              THR Management
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Tunjangan Hari Raya 2026
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 space-y-8 md:space-y-12 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            <ThrQuotaCard totalSpent={totalSpent} />
            <ThrSpendingList items={spending} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            <ThrEntryForm />
          </div>
        </div>
      </main>
    </div>
  );
}
