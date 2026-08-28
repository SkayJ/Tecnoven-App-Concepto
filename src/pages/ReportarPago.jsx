import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import localClient from "@/api/localClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, UploadCloud, CheckCircle2 } from "lucide-react";
import { BS_METHODS, USD_METHODS, METHOD_CURRENCY } from "@/lib/paymentMethods";

const METHODS = [...BS_METHODS, ...USD_METHODS];

export default function ReportarPago() {
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState("Pago Movil");
  const [monto, setMonto] = useState("");
  const [referencia, setReferencia] = useState("");
  const [fecha, setFecha] = useState(new Date().toISOString().slice(0, 10));
  const [titular, setTitular] = useState("");
  const [nota, setNota] = useState("");
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const moneda = METHOD_CURRENCY[metodo];

  const handleFile = async (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setUploading(true);
    setError("");
    try {
      const { file_url } = await localClient.integrations.Core.UploadFile({ file: f });
      setFileUrl(file_url);
    } catch {
      setError("No pudimos subir el comprobante. Intenta de nuevo.");
      setFile(null);
    }
    setUploading(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!fileUrl) return setError("Adjunta la imagen o PDF del pago.");
    setSaving(true);
    setError("");
    try {
      await localClient.entities.Payment.create({
        metodo,
        monto: parseFloat(monto),
        moneda,
        referencia,
        fecha,
        titular,
        nota,
        comprobante_url: fileUrl,
        estado: "en_revision",
      });
      navigate("/mis-pagos");
    } catch {
      setError("No pudimos registrar el pago. Revisa los datos e intenta otra vez.");
      setSaving(false);
    }
  };

  return (
    <div>
      <header className="mb-8">
        <p className="text-xs uppercase tracking-[0.2em] text-[#9B0E17]">Comprobante</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-900">Reportar pago</h1>
        <p className="mt-2 max-w-lg text-neutral-500">4 datos y tu comprobante. Lo verificaremos lo antes posible.</p>
      </header>

      <form onSubmit={submit} className="max-w-xl space-y-5 rounded-2xl border border-neutral-200 bg-white p-6">
        <div>
          <Label className="mb-2 block">¿Con cuál método pagaste?</Label>
          <div className="flex flex-wrap gap-2">
            {METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMetodo(m.id)}
                className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                  metodo === m.id
                    ? "border-[#9B0E17] bg-[#9B0E17] text-white"
                    : "border-neutral-200 text-neutral-600 hover:border-neutral-400"
                }`}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="monto">Monto ({moneda})</Label>
            <Input
              id="monto" type="number" step="0.01" required value={monto}
              onChange={(e) => setMonto(e.target.value)} placeholder="0,00" className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="fecha">Fecha del pago</Label>
            <Input
              id="fecha" type="date" required value={fecha}
              onChange={(e) => setFecha(e.target.value)} className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="ref">Referencia o número de operación</Label>
          <Input
            id="ref" required value={referencia} onChange={(e) => setReferencia(e.target.value)}
            placeholder="Ej. 004512789" className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="titular">Titular del servicio (opcional)</Label>
          <Input
            id="titular" value={titular} onChange={(e) => setTitular(e.target.value)}
            placeholder="Nombre y apellido" className="mt-1.5"
          />
        </div>

        <div>
          <Label className="mb-1.5 block">Comprobante (imagen o PDF)</Label>
          <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-neutral-300 px-4 py-4 hover:border-[#9B0E17]">
            <input type="file" accept="image/*,application/pdf" className="hidden" onChange={handleFile} />
            {uploading ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#9B0E17]" />
            ) : fileUrl ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
            ) : (
              <UploadCloud className="h-5 w-5 text-neutral-400" />
            )}
            <span className="truncate text-sm text-neutral-600">
              {uploading ? "Subiendo…" : file ? file.name : "Adjunta el comprobante"}
            </span>
          </label>
        </div>

        <div>
          <Label htmlFor="nota">Nota (opcional)</Label>
          <Textarea
            id="nota" value={nota} onChange={(e) => setNota(e.target.value)}
            placeholder="Algo que debamos saber" className="mt-1.5"
          />
        </div>

        {error && <p className="text-sm text-[#9B0E17]">{error}</p>}

        <Button
          type="submit" disabled={saving || uploading}
          className="w-full bg-[#9B0E17] py-6 text-base hover:bg-[#7d0b12]"
        >
          {saving ? "Enviando…" : "Enviar pago"}
        </Button>
      </form>
    </div>
  );
}