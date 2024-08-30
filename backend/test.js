const jwt = require('jsonwebtoken');

const secret = 'your_secret';  // Replace with your actual secret key

// Create a test token
const testToken = jwt.sign({ test: 'test' }, secret, { expiresIn: '1h' });

console.log('Test Token:', testToken);

// Verify the test token
try {
    const decoded = jwt.verify(testToken, secret);
    console.log('Decoded Token:', decoded);
} catch (err) {
    console.error('Error:', err.message);
}
