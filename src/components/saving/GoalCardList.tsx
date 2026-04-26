"use client";

import { useState } from "react";
import GoalCard from "./GoalCard";
import SavingEntryModal from "./SavingEntryModal";
import SavingTotalRow from "./SavingTotalRow";
import type { SavingGoal, MonthlyTotal } from "@/types/saving";

interface GoalCardListProps {
  goals: SavingGoal[];
  monthlyTotals: MonthlyTotal[];
  year: number;
}

export default function GoalCardList({
  goals,
  monthlyTotals,
  year,
}: GoalCardListProps) {
  const [editModal, setEditModal] = useState<{
    goalId: string;
    goalName: string;
    instrument: string;
    month: number;
    currentAmount: number;
  } | null>(null);

  const handleEdit = (
    goalId: string,
    goalName: string,
    instrument: string,
    month: number,
    currentAmount: number
  ) => {
    setEditModal({ goalId, goalName, instrument, month, currentAmount });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
        Investment Goals
      </h3>

      <div className="space-y-3">
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onEdit={handleEdit} />
        ))}
      </div>

      {/* Total Row */}
      <SavingTotalRow monthlyTotals={monthlyTotals} />

      {/* Edit Modal */}
      {editModal && (
        <SavingEntryModal
          goalId={editModal.goalId}
          goalName={editModal.goalName}
          instrument={editModal.instrument}
          month={editModal.month}
          year={year}
          currentAmount={editModal.currentAmount}
          onClose={() => setEditModal(null)}
        />
      )}
    </div>
  );
}
