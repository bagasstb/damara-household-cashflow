"use client";

import type { CategoryConfig } from "@/lib/utils/constants";

interface CategoryFilterProps {
  categories: CategoryConfig[];
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  activeFilter,
  onFilterChange,
}: CategoryFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar w-full md:w-auto">
      <button
        onClick={() => onFilterChange("all")}
        className={`filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl whitespace-nowrap cursor-pointer ${
          activeFilter === "all"
            ? "active"
            : "bg-slate-100 dark:bg-white/5 dark:text-slate-400"
        }`}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.name}
          onClick={() => onFilterChange(cat.name.toLowerCase())}
          className={`filter-btn px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-xl whitespace-nowrap cursor-pointer ${
            activeFilter === cat.name.toLowerCase()
              ? "active"
              : `bg-slate-100 dark:bg-white/5 dark:text-slate-400 ${cat.hoverBg} hover:text-white`
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
