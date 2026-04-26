"use client";

import { useRouter } from "next/navigation";

interface YearTabsProps {
  years: number[];
  activeYear: number;
}

export default function YearTabs({ years, activeYear }: YearTabsProps) {
  const router = useRouter();

  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
      {years.map((year) => (
        <button
          key={year}
          onClick={() => router.push(`/saving/${year}`)}
          className={`px-5 py-2.5 rounded-2xl text-sm font-black tracking-tight transition-all cursor-pointer whitespace-nowrap active:scale-95 ${
            year === activeYear
              ? "bg-violet-600 text-white shadow-lg shadow-violet-500/30"
              : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/10"
          }`}
        >
          {year}
        </button>
      ))}
    </div>
  );
}
