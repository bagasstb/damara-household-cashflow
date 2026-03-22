"use client";

import { LayoutDashboard, History, Plus, PieChart, Receipt } from "lucide-react";

export default function MobileNav() {
  const scrollTo = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-dark-surface border-t border-slate-200 dark:border-white/10 z-[60] flex items-center justify-between py-3 px-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        id="mobile-nav-home"
        className="flex flex-col items-center gap-1 text-primary min-w-[48px] min-h-[48px] justify-center transition-transform active:scale-90"
      >
        <LayoutDashboard className="w-6 h-6" />
        <span className="text-[9px] font-black uppercase tracking-tighter">
          Home
        </span>
      </button>
      <button
        onClick={(e) => scrollTo(e, "daily-cashflow-section")}
        id="mobile-nav-history"
        className="flex flex-col items-center gap-1 text-secondary dark:text-slate-400 min-w-[48px] min-h-[48px] justify-center transition-transform active:scale-90"
      >
        <History className="w-6 h-6" />
        <span className="text-[9px] font-black uppercase tracking-tighter">
          Cashflow
        </span>
      </button>

      <div className="-mt-12 group">
        <button
          onClick={(e) => scrollTo(e, "quick-entry-section")}
          id="mobile-fab"
          className="w-14 h-14 bg-accent text-white rounded-3xl flex items-center justify-center shadow-xl shadow-accent/40 border-4 border-white dark:border-dark-bg transition-all active:scale-90 cursor-pointer"
        >
          <Plus className="w-6 h-6" />
        </button>
      </div>

      <button
        onClick={(e) => scrollTo(e, "analytics-section")}
        id="mobile-nav-budgets"
        className="flex flex-col items-center gap-1 text-secondary dark:text-slate-400 min-w-[48px] min-h-[48px] justify-center transition-transform active:scale-90"
      >
        <PieChart className="w-6 h-6" />
        <span className="text-[9px] font-black uppercase tracking-tighter">
          Stats
        </span>
      </button>
      <button
        onClick={(e) => scrollTo(e, "reimburse-section")}
        id="mobile-nav-profile"
        className="flex flex-col items-center gap-1 text-secondary dark:text-slate-400 min-w-[48px] min-h-[48px] justify-center transition-transform active:scale-90"
      >
        <Receipt className="w-6 h-6" />
        <span className="text-[9px] font-black uppercase tracking-tighter">
          Reimburse
        </span>
      </button>
    </nav>
  );
}
