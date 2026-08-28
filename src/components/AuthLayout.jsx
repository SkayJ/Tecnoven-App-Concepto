import React from "react";
import BrandMark from "@/components/BrandMark";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#9B0E17] px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, #fff 0, transparent 40%), radial-gradient(circle at 80% 70%, #fff 0, transparent 45%)`,
        }}
      />
      <div className="relative w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center text-white">
          <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-2 backdrop-blur-sm">
            <BrandMark className="h-10 w-10" />
            <span className="text-2xl font-semibold tracking-tight">
              <span className="text-white">Tecno</span>
              <span className="text-white/80">ven</span>
            </span>
          </div>
          <p className="mt-3 text-sm text-white/70">Internet + Televisión · Soporte 24/7</p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{title}</h1>
            {subtitle && <p className="mt-1.5 text-sm text-neutral-500">{subtitle}</p>}
          </div>
          {children}
        </div>

        {footer && <p className="mt-6 text-center text-sm text-white/80">{footer}</p>}
      </div>
    </div>
  );
}