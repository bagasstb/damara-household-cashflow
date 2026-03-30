"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/lib/utils/constants";
import type { Transaction } from "@/types";
import CategoryFilter from "@/components/dashboard/CategoryFilter";
import TransactionTable from "@/components/dashboard/TransactionTable";
import TransactionCard from "@/components/dashboard/TransactionCard";

interface CashflowAllTransactionsProps {
  transactions: Transaction[];
  cycleId?: string;
}

export default function CashflowAllTransactions({
  transactions,
  cycleId,
}: CashflowAllTransactionsProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === "all") return true;
    return t.category?.name.toLowerCase() === activeFilter;
  });

  return (
    <div className="space-y-6">
      {/* Filter + count row */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="text-sm text-secondary dark:text-slate-400 font-bold">
          {filteredTransactions.length}{" "}
          <span className="font-black text-slate-700 dark:text-slate-200">transaksi</span>
        </div>
        <CategoryFilter
          categories={CATEGORIES}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>

      {/* Desktop Table — all transactions */}
      <TransactionTable transactions={filteredTransactions} />

      {/* Mobile Cards — all transactions */}
      <div className="md:hidden space-y-4">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-16 text-secondary dark:text-slate-500">
            <p className="font-black text-sm uppercase tracking-wider">Tidak ada transaksi</p>
          </div>
        ) : (
          filteredTransactions.map((tx, index) => {
            const formattedDate = tx.date.split("T")[0];
            const prevDate =
              index > 0 ? filteredTransactions[index - 1].date.split("T")[0] : null;
            const showDate = formattedDate !== prevDate;
            return (
              <TransactionCard key={tx.id} transaction={tx} showDate={showDate} />
            );
          })
        )}
      </div>
    </div>
  );
}
