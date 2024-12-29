const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
