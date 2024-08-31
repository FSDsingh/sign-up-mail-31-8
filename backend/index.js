const express = require('express');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const sendEmail = require('./services/emailService'); // Import email service

require('dotenv').config();
require('./Models/db');

const app = express();
const PORT = process.env.PORT || 8080;

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Middleware
app.use(express.json()); // Use express's built-in JSON parser

// Test email functionality (for testing purposes, remove after testing)
app.get('/send-test-email', async (req, res) => {
    try {
        await sendEmail('your-email@example.com', 'Test Subject', 'Test email body');
        res.status(200).send('Test email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send test email');
    }
});

// Routes
app.get('/ping', (req, res) => {
    res.send('PONG');
});
app.use('/auth', AuthRouter);
app.use('/auth/products', ProductRouter);

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something went wrong!',
        success: false
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
