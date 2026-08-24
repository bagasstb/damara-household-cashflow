"use client";

import { Wallet, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/providers";
import CycleSelector from "./CycleSelector";
import NewCycleButton from "./NewCycleButton";
import type { Cycle } from "@/types";

interface HeaderProps {
  cycles?: Cycle[];
  activeCycle?: Cycle;
}

export default function Header({ cycles = [], activeCycle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-dark-surface/95 backdrop-blur-md border-b border-slate-200 dark:border-white/10 px-4 md:px-8 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 bg-primary rounded-2xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight leading-none">
              Household Cashflow
            </h1>
            {activeCycle && (
              <CycleSelector cycles={cycles} activeCycleId={activeCycle.id} />
            )}
          </div>
        </div>



        <div className="flex items-center gap-3">
          {/* New Cycle button */}
          <NewCycleButton cycles={cycles as any} />

          <button
            onClick={toggleTheme}
            className="w-11 h-11 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-600 dark:text-slate-300 transition-all cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {theme === "light" ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
