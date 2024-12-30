const redis = require('redis');
require('dotenv').config();
// Create a Redis client
const redisClient = redis.createClient({
 // Redis server port
  socket: {
    host: process.env.REDIS_HOST || 'redis', // Redis server host
    port: process.env.REDIS_PORT || 6379,
    keepAlive: true, // Enable keep-alive
  },        
});

// Handle connection events
(async () => {
  try {
    await redisClient.connect(); // Ensure the client connects
    console.log('Connected to Redis !');
  } catch (err) {
    console.error('Redis connection error:', err);
  }
})();

redisClient.on('error', (err) => {
  console.error('Redis connection error:', err);
});

module.exports = redisClient;