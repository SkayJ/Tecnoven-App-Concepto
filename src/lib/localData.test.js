import test from 'node:test';
import assert from 'node:assert/strict';

import {
  registerLocalUser,
  loginLocalUser,
  getLocalServices,
  createLocalPayment,
  getLocalPayments,
  logoutLocalUser,
} from './localData.js';

test('register and login a local user', () => {
  localStorage.clear();

  const user = registerLocalUser({ email: 'demo@tecnoven.com', password: 'secret123' });
  assert.equal(user.email, 'demo@tecnoven.com');

  const session = loginLocalUser({ email: 'demo@tecnoven.com', password: 'secret123' });
  assert.equal(session.user.email, 'demo@tecnoven.com');
  assert.ok(session.token.length > 10);
});

test('creates and lists local payments and services', () => {
  localStorage.clear();

  const services = getLocalServices();
  assert.ok(Array.isArray(services) && services.length > 0);

  const payment = createLocalPayment({
    metodo: 'Pago Movil',
    monto: 150,
    moneda: 'Bs',
    referencia: 'REF-1',
    fecha: '2026-08-20',
    titular: 'Demo',
    nota: 'Prueba local',
    comprobante_url: 'https://example.com/comprobante.png',
    estado: 'en_revision',
  });

  const items = getLocalPayments();
  assert.equal(items.length, 1);
  assert.equal(items[0].id, payment.id);
});

test('logout clears the active session', () => {
  localStorage.clear();
  registerLocalUser({ email: 'demo2@tecnoven.com', password: 'secret123' });
  loginLocalUser({ email: 'demo2@tecnoven.com', password: 'secret123' });

  logoutLocalUser();
  assert.equal(JSON.parse(localStorage.getItem('tecnoven_session') || 'null'), null);
});
