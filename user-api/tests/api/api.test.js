const request = require('supertest');
const app = require('../../server'); // Ensure server.js exports the app
const redisClient = require('../../redis-connection');

jest.mock('../../redis-connection', () => ({
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
}));

describe('API Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should create a user successfully', async () => {
    redisClient.set.mockResolvedValue('OK');

    const response = await request(app)
      .post('/api/users')
      .send({ id: '1', name: 'Alice', email: 'alice@example.com' });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
    expect(redisClient.set).toHaveBeenCalledWith(
      'user:1',
      JSON.stringify({ id: '1', name: 'Alice', email: 'alice@example.com' })
    );
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app).post('/api/users').send({ name: 'Alice' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('ID, name, and email are required');
  });

  it('should retrieve a user successfully', async () => {
    redisClient.get.mockResolvedValue(JSON.stringify({ id: '1', name: 'Alice', email: 'alice@example.com' }));

    const response = await request(app).get('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: '1', name: 'Alice', email: 'alice@example.com' });
    expect(redisClient.get).toHaveBeenCalledWith('user:1');
  });

  it('should return 404 if the user does not exist', async () => {
    redisClient.get.mockResolvedValue(null);

    const response = await request(app).get('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
    expect(redisClient.get).toHaveBeenCalledWith('user:999');
  });

  it('should delete a user successfully', async () => {
    redisClient.del.mockResolvedValue(1);

    const response = await request(app).delete('/api/users/1');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
    expect(redisClient.del).toHaveBeenCalledWith('user:1');
  });

  it('should return 404 when deleting a non-existent user', async () => {
    redisClient.del.mockResolvedValue(0);

    const response = await request(app).delete('/api/users/999');

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('User not found');
    expect(redisClient.del).toHaveBeenCalledWith('user:999');
  });
});
