// testEmail.js
const sendEmail = require('./services/emailService');

const testEmail = async () => {
    try {
        await sendEmail('test@example.com', 'Test Subject', 'Test Body');
        console.log('Test email sent successfully');
    } catch (error) {
        console.error('Error sending test email:', error);
    }
};

testEmail();
