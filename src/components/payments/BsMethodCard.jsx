import React from "react";
import CopyField from "@/components/CopyField";
import { ACCOUNT_HOLDER, RIF } from "@/lib/paymentMethods";

export default function BsMethodCard({ method }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <h3 className="text-base font-semibold text-neutral-900">{method.name}</h3>
        <span className="text-xs font-medium text-[#9B0E17]">Bolívares</span>
      </div>
      <div className="space-y-2.5">
        <CopyField label={method.label} value={method.value} copyValue={method.raw} />
        <CopyField label="Titular" value={ACCOUNT_HOLDER} />
        <CopyField label="RIF" value={RIF} />
      </div>
    </div>
  );
}