"use client";

interface CycleSelectorDropdownProps {
  cycles: { id: string; name: string }[];
  activeCycleId: string;
}

export default function CycleSelectorDropdown({
  cycles,
  activeCycleId,
}: CycleSelectorDropdownProps) {
  return (
    <select
      value={activeCycleId}
      onChange={(e) => {
        const val = (e.target as HTMLSelectElement).value;
        window.location.href = val ? `/cashflow?cycle=${val}` : "/cashflow";
      }}
      className="text-xs font-black bg-slate-100 dark:bg-slate-800 border-0 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
    >
      {cycles.map((c) => (
        <option key={c.id} value={c.id}>
          {c.name}
        </option>
      ))}
    </select>
  );
}
