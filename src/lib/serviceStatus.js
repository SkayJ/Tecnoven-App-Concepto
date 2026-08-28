export function computeServiceStatus(debts, today = new Date()) {
  const pending = (debts || []).filter((d) => d.estado === "pendiente");
  const overdue = pending.filter((d) => new Date(d.fecha_vencimiento) < today);
  const totalPendiente = pending.reduce((s, d) => s + (d.monto || 0), 0);
  return { activo: overdue.length === 0, pending, overdue, totalPendiente };
}

export function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("es-VE", { day: "2-digit", month: "short", year: "numeric" });
}