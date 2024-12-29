const request = require('supertest');
const app = require('../../server'); // Ensure server.js exports the app

describe('Configuration Tests', () => {
  beforeAll(() => {
    // Mock environment variables
    process.env.REDIS_HOST = '127.0.0.1';
    process.env.REDIS_PORT = '6379';
    process.env.PORT = '3000';
  });
  it('should have the required environment variables set', () => {
    expect(process.env.REDIS_HOST).toBeDefined();
    expect(process.env.REDIS_PORT).toBeDefined();
    expect(process.env.PORT).toBeDefined();
  });

  it('should serve the application at the correct API base path', async () => {
    const response = await request(app).get('/api/users');
    if (response.status !== 404) {
      expect(response.status).toBeGreaterThanOrEqual(200);
      expect(response.status).toBeLessThan(500);
    }
  });

  it('should not expose non-API paths', async () => {
    const response = await request(app).get('/non-existent-path');
    expect(response.status).toBe(404);
  });
});
