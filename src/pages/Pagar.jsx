import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BsMethodCard from "@/components/payments/BsMethodCard";
import UsdMethodCard from "@/components/payments/UsdMethodCard";
import { BS_METHODS, USD_METHODS } from "@/lib/paymentMethods";

export default function Pagar() {
  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9B0E17]">Datos para pagar</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Pagar</h1>
        <p className="mt-2 max-w-lg text-neutral-500">
          Copia los datos de la cuenta que prefieras, haz tu transferencia y luego reporta tu pago con el comprobante.
        </p>
      </header>

      <section className="mb-8">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">En bolívares</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {BS_METHODS.map((m) => (
            <BsMethodCard key={m.id} method={m} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-widest text-neutral-400">
          En dólares digitales
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {USD_METHODS.map((m) => (
            <UsdMethodCard key={m.id} method={m} />
          ))}
        </div>
      </section>

      <div className="rounded-2xl border border-[#9B0E17]/20 bg-[#9B0E17]/5 p-6 text-center">
        <p className="font-medium text-neutral-900">¿Ya hiciste tu transferencia?</p>
        <p className="mt-1 text-sm text-neutral-500">Regístrala aquí para que la verifiquemos más rápido.</p>
        <Link to="/reportar">
          <Button className="mt-4 bg-[#9B0E17] hover:bg-[#7d0b12]">Reportar pago</Button>
        </Link>
      </div>
    </div>
  );
}