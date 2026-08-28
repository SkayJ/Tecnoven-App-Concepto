import React from "react";
import CopyField from "@/components/CopyField";

export default function UsdMethodCard({ method }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-neutral-900">{method.name}</h3>
        <span className="text-xs font-medium text-[#9B0E17]">Dólares digitales</span>
      </div>
      <div className="space-y-2.5">
        {method.holder && <CopyField label="A nombre de" value={method.holder} />}
        {method.rows.map((r) => (
          <CopyField key={r.label} label={r.label} value={r.value} />
        ))}
      </div>
      <ul className="mt-4 space-y-1.5">
        {method.notes.map((n) => (
          <li key={n} className="flex gap-2 text-[13px] leading-relaxed text-neutral-500">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#9B0E17]" />
            {n}
          </li>
        ))}
      </ul>
    </div>
  );
}