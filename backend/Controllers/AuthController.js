// controllers/authController.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");
const sendEmail = require('../services/emailService');

// Handle user signup
const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists, you can log in', success: false });
        }
        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();

        // Send a welcome email
        await sendEmail(email, 'Welcome to Our Service', 'Thank you for signing up!');

        res.status(201)
            .json({
                message: "Signup successfully",
                success: true
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

// Handle user login
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });
        const errorMsg = 'Auth failed, email or password is wrong';
        if (!user) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403)
                .json({ message: errorMsg, success: false });
        }
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Optionally, send a login success email
        await sendEmail(email, 'Login Successful', 'You have successfully logged in.');

        res.status(200)
            .json({
                message: "Login successful",
                success: true,
                jwtToken,
                email,
                name: user.name
            });
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                success: false
            });
    }
};

module.exports = {
    signup,
    login
};
