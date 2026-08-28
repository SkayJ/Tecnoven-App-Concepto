export const ACCOUNT_HOLDER = "TECNOVEN SERVICES C.A.";
export const RIF = "J412755064";

export const BS_METHODS = [
  { id: "BNC", name: "BNC", label: "Cuenta", value: "0191 0101 1121 0006 2410", raw: "01910101112100062410" },
  { id: "Bancamiga", name: "Bancamiga", label: "Cuenta", value: "0172 0110 7211 0871 1993", raw: "01720110721108711993" },
  { id: "Pago Movil", name: "Pago Móvil", label: "Teléfono", value: "0414-6952413", raw: "04146952413" },
];

export const USD_METHODS = [
  {
    id: "PayPal",
    name: "PayPal",
    holder: "Ildefonso Salas",
    rows: [{ label: "Correo", value: "idelfonso4@hotmail.com" }],
    notes: [
      "Coloca en la nota el nombre del titular del servicio.",
      "Realiza el pago sin dirección de envío.",
      "Agrega la comisión al monto.",
    ],
  },
  {
    id: "USDT Binance",
    name: "USDT · Binance",
    rows: [
      { label: "Pay ID", value: "253843719" },
      { label: "Binance ID", value: "208061673" },
    ],
    notes: ["Red recomendada: pago directo por Binance Pay."],
  },
  {
    id: "Zelle",
    name: "Zelle",
    holder: "QOS TECHNOLOGY LLC",
    rows: [{ label: "Correo", value: "zelle2@tecnovenca.net" }],
    notes: ["Indica el nombre del titular de la cuenta y el código de referencia."],
  },
];

export const ALL_METHOD_IDS = [
  ...BS_METHODS.map((m) => m.id),
  ...USD_METHODS.map((m) => m.id),
];

export const METHOD_CURRENCY = {
  BNC: "Bs",
  Bancamiga: "Bs",
  "Pago Movil": "Bs",
  PayPal: "USD",
  "USDT Binance": "USD",
  Zelle: "USD",
};