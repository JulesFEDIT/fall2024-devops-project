const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  host: '127.0.0.1', // Redis server host
  port: 6379, // Redis server port
  socket: {
    keepAlive: true, // Enable keep-alive
  },        
});

// Handle connection events
client.on('connect', () => {
  console.log('Connected to Redis!');
});

client.on('error', (err) => {
  console.error('Redis connection error:', err);
});

client.on('end', () => {
  console.error('Redis connection closed unexpectedly');
});

module.exports = {
  ping: () => redisClient.ping(),
  client,
}
