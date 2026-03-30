"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, List } from "lucide-react";
import { CATEGORIES } from "@/lib/utils/constants";
import type { Transaction } from "@/types";
import CategoryFilter from "./CategoryFilter";
import TransactionTable from "./TransactionTable";
import TransactionCard from "./TransactionCard";

const PREVIEW_LIMIT = 8;

interface DailyCashflowProps {
  transactions: Transaction[];
  cycleId?: string;
}

export default function DailyCashflow({ transactions, cycleId }: DailyCashflowProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === "all") return true;
    return t.category?.name.toLowerCase() === activeFilter;
  });

  const previewTransactions = filteredTransactions.slice(0, PREVIEW_LIMIT);
  const hasMore = filteredTransactions.length > PREVIEW_LIMIT;
  const seeAllHref = cycleId ? `/cashflow?cycle=${cycleId}` : "/cashflow";

  return (
    <div id="daily-cashflow-section" className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-primary rounded-full" />
          <h2 className="text-2xl font-black tracking-tight">
            Daily Cashflow
          </h2>
        </div>
        <CategoryFilter
          categories={CATEGORIES}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Desktop Table — preview only */}
      <TransactionTable transactions={previewTransactions} />

      {/* Mobile Cards — preview only */}
      <div className="md:hidden space-y-4">
        {previewTransactions.map((tx, index) => {
          const formattedDate = tx.date.split("T")[0];
          const prevDate = index > 0 ? previewTransactions[index - 1].date.split("T")[0] : null;
          const showDate = formattedDate !== prevDate;
          return <TransactionCard key={tx.id} transaction={tx} showDate={showDate} />;
        })}
      </div>

      {/* See All button */}
      {hasMore && (
        <Link
          href={seeAllHref}
          className="flex items-center justify-center gap-2.5 w-full py-4 rounded-2xl border-2 border-dashed border-slate-200 dark:border-white/10 text-secondary dark:text-slate-400 hover:border-primary hover:text-primary dark:hover:border-blue-400 dark:hover:text-blue-400 transition-all group"
        >
          <List className="w-4 h-4" />
          <span className="text-sm font-black uppercase tracking-wider">
            Lihat Semua ({filteredTransactions.length} transaksi)
          </span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
