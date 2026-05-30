import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { getCategoryComparisonData } from "@/lib/analisis-services";
import CategoryComparisonChart from "@/components/analisis/CategoryComparisonChart";

export const metadata: Metadata = {
  title: "Analisis — Household Cashflow",
  description: "Perbandingan pengeluaran per kategori antar bulan.",
};

export default async function AnalisisPage() {
  const data = await getCategoryComparisonData();

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-50 flex flex-col selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 h-16 flex items-center gap-4">
          <Link
            href="/"
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>

          <div className="flex-1 min-w-0">
            <h1 className="text-lg font-black tracking-tight leading-none">
              Analisis Pengeluaran
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-blue-400 mt-0.5">
              Perbandingan per kategori
            </p>
          </div>

          <div className="w-9 h-9 bg-primary/10 dark:bg-primary/20 rounded-xl flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-primary" />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 pb-24 md:pb-8 space-y-6">
        {data.categories.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <BarChart3 className="w-12 h-12 opacity-30" />
            <p className="text-sm font-bold">Belum ada data transaksi.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-surface rounded-[2rem] border border-slate-100 dark:border-white/5 p-5 md:p-8 shadow-sm">
            {/* Intro text */}
            <div className="mb-8">
              <h2 className="text-base font-black tracking-tight">
                Pengeluaran per Bulan
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">
                Pilih kategori yang ingin dibandingkan. Hover grafik untuk detail angka.
              </p>
            </div>

            <CategoryComparisonChart data={data} />
          </div>
        )}
      </main>
    </div>
  );
}
