const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const redisClient = require('./redis-connection');

// Create an Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Use the user routes
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Application is actually running',
    });
});

app.get('/test-redis', async (req, res) => {
    try {
      console.log('Testing Redis connection...');
      const result = await redisClient.ping();
      console.log('PING response:', result);
      res.status(200).json({ message: 'Redis is connected', ping: result });
    } catch (err) {
      console.error('Redis connection test error:', err.message);
      console.error('Redis client state:', redisClient.isOpen ? 'Open' : 'Closed');
      res.status(500).json({ error: 'Redis connection failed', details: err.message });
    }
  });

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

// Start the server only if this file is executed directly
// if (require.main === module) {
//     const PORT = process.env.PORT || 3000;
//     app.listen(PORT, () => {
//         console.log(`Server running on http://localhost:${PORT}`);
//     });
// }

// Export the app for testing or reusability
module.exports = app;
