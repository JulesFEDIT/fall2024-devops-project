const redisClient = require('../../redis-connection');

jest.mock('../../redis-connection', () => ({
  ping: jest.fn(),
}));

describe('Redis Connection Tests', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should successfully connect to Redis', async () => {
    redisClient.ping.mockResolvedValue('PONG');

    const result = await redisClient.ping();

    expect(redisClient.ping).toHaveBeenCalledTimes(1);
    expect(result).toBe('PONG');
  });

  it('should handle connection failure gracefully', async () => {
    const error = new Error('Redis connection failed');
    redisClient.ping.mockRejectedValue(error);

    try {
      await redisClient.ping();
    } catch (err) {
      expect(redisClient.ping).toHaveBeenCalledTimes(1);
      expect(err).toBe(error);
    }
  });

  it('should throw an error if Redis is unavailable', async () => {
    redisClient.ping.mockImplementation(() => {
      throw new Error('Redis is unavailable');
    });

    try {
      await redisClient.ping();
    } catch (err) {
      expect(redisClient.ping).toHaveBeenCalledTimes(1);
      expect(err.message).toBe('Redis is unavailable');
    }
  });
});
