const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const redisClient = require('./redis-connection');

// Create an Express app
const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the User API Application</h1><p>Use the API to create, read, update, and delete users!</p><p>Check the README.md of the project to get more information about how this application.</p>");
});
// Use the user routes
app.use('/api/users', userRoutes);

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Application is actually running',
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
