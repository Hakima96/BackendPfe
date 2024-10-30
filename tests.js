const request = require('supertest');
const app = require('../app');

describe('Security Tests', () => {
  test('Vérification des en-têtes de sécurité', async () => {
    const response = await request(app).get('/');
    expect(response.headers['x-xss-protection']).toBeDefined();
    expect(response.headers['x-frame-options']).toBeDefined();
    expect(response.headers['content-security-policy']).toBeDefined();
  });

  test('Protection contre les injections NoSQL', async () => {
    const maliciousPayload = { email: { $ne: null } };
    const response = await request(app)
      .post('/api/auth/login')
      .send(maliciousPayload);
    expect(response.status).not.toBe(200);
  });

  test('Validation des entrées WebAssembly', async () => {
    const response = await request(app)
      .post('/api/services/execute')
      .attach('wasmFile', 'test/fixtures/malicious.wasm');
    expect(response.status).toBe(400);
  });
});
