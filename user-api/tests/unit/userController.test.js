const userController = require('../../controllers/userController');
const redisClient = require('../../redis-connection');

jest.mock('../../redis-connection', () => ({
  set: jest.fn(),
  get: jest.fn(),
  del: jest.fn(),
}));

describe('User Controller Unit Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should create a user and store it in Redis', async () => {
    redisClient.set.mockResolvedValue('OK');

    const req = { body: { id: '1', name: 'Alice', email: 'alice@example.com' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.createUser(req, res);

    expect(redisClient.set).toHaveBeenCalledWith(
      'user:1',
      JSON.stringify({ id: '1', name: 'Alice', email: 'alice@example.com' })
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: 'User created successfully' });
  });

  it('should return 400 if required fields are missing', async () => {
    const req = { body: { name: 'Alice' } }; // Missing `id` and `email`
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.createUser(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'ID, name, and email are required' });
  });

  it('should retrieve a user from Redis', async () => {
    redisClient.get.mockResolvedValue(JSON.stringify({ id: '1', name: 'Alice', email: 'alice@example.com' }));

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getUser(req, res);

    expect(redisClient.get).toHaveBeenCalledWith('user:1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ id: '1', name: 'Alice', email: 'alice@example.com' });
  });

  it('should return 404 if the user does not exist', async () => {
    redisClient.get.mockResolvedValue(null);

    const req = { params: { id: 'nonexistent' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.getUser(req, res);

    expect(redisClient.get).toHaveBeenCalledWith('user:nonexistent');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });

  it('should delete a user from Redis', async () => {
    redisClient.del.mockResolvedValue(1);

    const req = { params: { id: '1' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.deleteUser(req, res);

    expect(redisClient.del).toHaveBeenCalledWith('user:1');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User deleted successfully' });
  });

  it('should return 404 if the user to delete does not exist', async () => {
    redisClient.del.mockResolvedValue(0);

    const req = { params: { id: 'nonexistent' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await userController.deleteUser(req, res);

    expect(redisClient.del).toHaveBeenCalledWith('user:nonexistent');
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: 'User not found' });
  });
});
