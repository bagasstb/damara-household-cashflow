import type { BudgetLimit } from "@/types";
import BudgetCard from "./BudgetCard";

interface BudgetLimitsProps {
  budgets: BudgetLimit[];
}

export default function BudgetLimits({ budgets }: BudgetLimitsProps) {
  const bagasBudgets = budgets
    .filter((b) => b.category_id.includes("bagas") || b.label.toLowerCase().includes("bagas"))
    .sort((a, b) => a.label.localeCompare(b.label));
    
  const deanBudgets = budgets
    .filter((b) => b.category_id.includes("dean") || b.label.toLowerCase().includes("dean"))
    .sort((a, b) => a.label.localeCompare(b.label));
  
  const sharedBudgets = budgets.filter(
    (b) =>
      !b.category_id.includes("bagas") &&
      !b.label.toLowerCase().includes("bagas") &&
      !b.category_id.includes("dean") &&
      !b.label.toLowerCase().includes("dean")
  );

  if (budgets.length === 0) return null;

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-black tracking-tight leading-none">
          Budget Limits
        </h2>
        <a
          href="#"
          className="text-[10px] font-black uppercase text-primary dark:text-blue-400 hover:underline"
        >
          Refine All
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bagas */}
        {bagasBudgets.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-widest pl-3 border-l-2 border-primary">
              Personal (Bagas)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {bagasBudgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
        )}

        {/* Dean */}
        {deanBudgets.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-widest pl-3 border-l-2 border-pink-500">
              Personal (Dean)
            </h3>
            <div className="grid grid-cols-1 gap-3">
              {deanBudgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
        )}

        {/* Shared */}
        {sharedBudgets.length > 0 && (
          <div className="space-y-3 md:col-span-2 pt-2">
            <h3 className="text-[10px] font-black uppercase text-secondary dark:text-slate-400 tracking-widest pl-3 border-l-2 border-emerald-500">
              Shared / Household
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {sharedBudgets.map((budget) => (
                <BudgetCard key={budget.id} budget={budget} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
