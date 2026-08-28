import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localClient from "@/api/localClient";
import { Button } from "@/components/ui/button";
import PaymentRow from "@/components/payments/PaymentRow";

export default function MisPagos() {
  const [payments, setPayments] = useState(null);

  useEffect(() => {
    localClient.entities.Payment.list().then(setPayments);
  }, []);

  return (
    <div>
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[#9B0E17]">Historial</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Mis pagos</h1>
        </div>
        <Link to="/reportar">
          <Button className="bg-[#9B0E17] hover:bg-[#7d0b12]">Reportar pago</Button>
        </Link>
      </header>

      {payments === null ? (
        <p className="text-neutral-400">Cargando…</p>
      ) : payments.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-white px-6 py-12 text-center">
          <p className="font-medium text-neutral-800">Aún no has reportado pagos</p>
          <p className="mt-1 text-sm text-neutral-500">Cuando reportes un pago aparecerá aquí.</p>
          <Link to="/reportar">
            <Button variant="outline" className="mt-4 border-[#9B0E17] text-[#9B0E17] hover:bg-[#9B0E17]/5">
              Reportar mi primer pago
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {payments.map((p) => (
            <PaymentRow key={p.id} payment={p} />
          ))}
        </div>
      )}
    </div>
  );
}