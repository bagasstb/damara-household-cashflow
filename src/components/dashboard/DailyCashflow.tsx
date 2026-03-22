"use client";

import { useState } from "react";
import { CATEGORIES } from "@/lib/utils/constants";
import type { Transaction } from "@/types";
import CategoryFilter from "./CategoryFilter";
import TransactionTable from "./TransactionTable";
import TransactionCard from "./TransactionCard";

interface DailyCashflowProps {
  transactions: Transaction[];
}

export default function DailyCashflow({ transactions }: DailyCashflowProps) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredTransactions = transactions.filter((t) => {
    if (activeFilter === "all") return true;
    return t.category?.name.toLowerCase() === activeFilter;
  });

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

      {/* Desktop Table */}
      <TransactionTable transactions={filteredTransactions} />

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredTransactions.map((tx, index) => {
          const formattedDate = tx.date.split("T")[0]; // Fast compare
          const prevDate = index > 0 ? filteredTransactions[index - 1].date.split("T")[0] : null;
          const showDate = formattedDate !== prevDate;
          return <TransactionCard key={tx.id} transaction={tx} showDate={showDate} />;
        })}
      </div>
    </div>
  );
}
