const STORAGE_KEYS = {
  users: 'tecnoven_users',
  session: 'tecnoven_session',
  payments: 'tecnoven_payments',
  services: 'tecnoven_services',
};

const fallbackServices = [
  {
    id: 'svc-001',
    plan_nombre: 'Plan Fibra 100',
    tipo: 'Internet residencial',
    velocidad_mbps: 100,
    precio_mensual: 180,
    moneda: 'Bs',
    fecha_corte: 5,
    direccion: 'Urbanización Los Rosales, Casa 14',
  },
  {
    id: 'svc-002',
    plan_nombre: 'Plan TV + Internet',
    tipo: 'Combo digital',
    velocidad_mbps: 200,
    precio_mensual: 260,
    moneda: 'Bs',
    fecha_corte: 10,
    direccion: 'Avenida Libertador, Centro Comercial',
  },
];

const fallbackPayments = [
  {
    id: 'pay-001',
    metodo: 'Pago Movil',
    monto: 180,
    moneda: 'Bs',
    referencia: 'TRX-884521',
    fecha: '2026-08-01',
    titular: 'Juan Pérez',
    nota: 'Pago mensual de agosto',
    comprobante_url: '',
    estado: 'verificado',
    created_date: '2026-08-01T10:00:00.000Z',
  },
  {
    id: 'pay-002',
    metodo: 'BNC',
    monto: 260,
    moneda: 'Bs',
    referencia: '015789421',
    fecha: '2026-07-15',
    titular: 'Juan Pérez',
    nota: 'Cobro de servicio combo',
    comprobante_url: '',
    estado: 'en_revision',
    created_date: '2026-07-15T11:00:00.000Z',
  },
  {
    id: 'pay-003',
    metodo: 'Zelle',
    monto: 35,
    moneda: 'USD',
    referencia: 'ZL-7721',
    fecha: '2026-07-02',
    titular: 'Juan Pérez',
    nota: 'Pago extra por instalación',
    comprobante_url: '',
    estado: 'rechazado',
    created_date: '2026-07-02T12:15:00.000Z',
  },
];

function readStorage(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

function nowIso() {
  return new Date().toISOString();
}

export function getLocalUsers() {
  return readStorage(STORAGE_KEYS.users, []);
}

export function saveLocalUsers(users) {
  writeStorage(STORAGE_KEYS.users, users);
}

export function getLocalSession() {
  return readStorage(STORAGE_KEYS.session, null);
}

export function saveLocalSession(session) {
  writeStorage(STORAGE_KEYS.session, session);
}

export function logoutLocalUser() {
  saveLocalSession(null);
  return null;
}

export function registerLocalUser({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  if (!normalizedEmail || !String(password || '').trim()) {
    throw new Error('Email and password are required.');
  }

  const users = getLocalUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    throw new Error('An account with that email already exists.');
  }

  const user = {
    id: `user-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    email: normalizedEmail,
    password: String(password),
    createdAt: nowIso(),
  };

  saveLocalUsers([...users, user]);
  return user;
}

export function loginLocalUser({ email, password }) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  const users = getLocalUsers();
  const user = users.find(
    (entry) => entry.email === normalizedEmail && entry.password === String(password || '')
  );

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const token = `local-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const session = { token, user: { id: user.id, email: user.email, createdAt: user.createdAt } };
  saveLocalSession(session);
  return session;
}

export function ensureDemoSession() {
  const users = getLocalUsers();
  const demoEmail = 'demo@tecnoven.com';
  const demoPassword = 'demo123';

  let user = users.find((entry) => entry.email === demoEmail);
  if (!user) {
    user = registerLocalUser({ email: demoEmail, password: demoPassword });
  }

  let session = getLocalSession();
  if (!session || session.user?.email !== demoEmail) {
    session = loginLocalUser({ email: demoEmail, password: demoPassword });
  }

  return session;
}

export function meLocalUser() {
  const session = getLocalSession();
  if (!session?.user) {
    return ensureDemoSession().user;
  }
  return session.user;
}

export function getLocalPayments() {
  const payments = readStorage(STORAGE_KEYS.payments, fallbackPayments);
  return Array.isArray(payments) && payments.length ? payments : fallbackPayments;
}

export function createLocalPayment(payload) {
  const payment = {
    id: `payment-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    created_date: nowIso(),
    ...payload,
  };

  const payments = getLocalPayments();
  const next = [payment, ...payments];
  saveLocalPayments(next);
  return payment;
}

export function saveLocalPayments(payments) {
  writeStorage(STORAGE_KEYS.payments, payments);
}

export function getLocalServices() {
  const services = readStorage(STORAGE_KEYS.services, fallbackServices);
  return Array.isArray(services) && services.length ? services : fallbackServices;
}

export function saveLocalServices(services) {
  writeStorage(STORAGE_KEYS.services, services);
}

export function resetPasswordRequestLocal(email) {
  const normalizedEmail = String(email || '').trim().toLowerCase();
  return normalizedEmail.length > 0;
}

export function resetPasswordLocal({ resetToken, newPassword }) {
  if (!resetToken || !String(newPassword || '').trim()) {
    throw new Error('Reset token and new password are required.');
  }

  const users = getLocalUsers();
  const session = getLocalSession();
  if (session?.user) {
    const user = users.find((entry) => entry.id === session.user.id);
    if (user) user.password = String(newPassword);
    saveLocalUsers(users);
  }

  return true;
}

export const localClient = {
  auth: {
    me: async () => {
      const user = meLocalUser();
      if (!user) throw Object.assign(new Error('Not authenticated'), { status: 401 });
      return user;
    },
    logout: async (redirectUrl) => {
      logoutLocalUser();
      if (redirectUrl && typeof window !== 'undefined') {
        window.location.href = redirectUrl;
      }
      return true;
    },
    redirectToLogin: (redirectUrl) => {
      if (typeof window !== 'undefined') {
        const next = redirectUrl || '/login';
        window.location.href = next;
      }
    },
    loginViaEmailPassword: async (email, password) => {
      const session = loginLocalUser({ email, password });
      return session;
    },
    register: async ({ email, password }) => {
      const user = registerLocalUser({ email, password });
      return { user };
    },
    verifyOtp: async ({ email, otpCode }) => {
      const user = getLocalUsers().find((entry) => entry.email === String(email || '').trim().toLowerCase());
      if (!user || !otpCode || String(otpCode).trim().length < 6) {
        throw new Error('Invalid verification code');
      }
      const session = loginLocalUser({ email: user.email, password: user.password });
      return { access_token: session.token };
    },
    resendOtp: async () => Promise.resolve({ sent: true }),
    setToken: (token) => {
      const session = getLocalSession();
      if (session) {
        session.token = token;
        saveLocalSession(session);
      }
    },
    resetPasswordRequest: async (email) => resetPasswordRequestLocal(email),
    resetPassword: async ({ resetToken, newPassword }) => resetPasswordLocal({ resetToken, newPassword }),
  },
  entities: {
    Payment: {
      list: async () => getLocalPayments(),
      create: async (data) => createLocalPayment(data),
    },
    Service: {
      list: async () => getLocalServices(),
    },
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }) => {
        if (!file) throw new Error('No file provided');
        const url = typeof URL !== 'undefined' && typeof URL.createObjectURL === 'function'
          ? URL.createObjectURL(file)
          : `https://example.com/uploads/${encodeURIComponent(file.name || 'upload')}`;
        return { file_url: url };
      },
    },
  },
};

export default localClient;
