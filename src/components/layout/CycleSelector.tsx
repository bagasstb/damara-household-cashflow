"use client";

import { useRouter } from "next/navigation";

interface Cycle {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
}

interface CycleSelectorProps {
  cycles: Cycle[];
  activeCycleId: string;
}

export default function CycleSelector({ cycles, activeCycleId }: CycleSelectorProps) {
  const router = useRouter();

  const handleCycleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cycleId = e.target.value;
    router.push(`/?cycle=${cycleId}`);
  };

  if (cycles.length <= 1) {
    // If there's only 1 cycle, no need for a dropdown
    return null;
  }

  return (
    <div className="relative mt-1">
      <select
        value={activeCycleId}
        onChange={handleCycleChange}
        className="appearance-none bg-slate-100 dark:bg-white/5 text-[10px] text-secondary dark:text-slate-300 font-bold uppercase tracking-[0.2em] py-1 pl-2 pr-6 rounded-md hover:bg-slate-200 dark:hover:bg-white/10 transition-colors cursor-pointer outline-none border border-transparent focus:border-primary/50"
      >
        {cycles.map((c) => (
          <option key={c.id} value={c.id} className="text-slate-900 dark:text-slate-900 tracking-normal">
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
}
