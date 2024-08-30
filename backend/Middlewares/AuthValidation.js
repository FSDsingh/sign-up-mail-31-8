const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required().messages({
            'string.empty': 'Name is required',
            'string.min': 'Name must be at least 3 characters long',
            'string.max': 'Name must be less than 100 characters long',
        }),
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 100 characters long',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error: error.details.map(detail => detail.message)
        });
    }
    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email is required',
            'string.email': 'Email must be a valid email address',
        }),
        password: Joi.string().min(4).max(100).required().messages({
            'string.empty': 'Password is required',
            'string.min': 'Password must be at least 4 characters long',
            'string.max': 'Password must be less than 100 characters long',
        }),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({
            message: "Validation failed",
            error: error.details.map(detail => detail.message)
        });
    }
    next();
}

module.exports = {
    signupValidation,
    loginValidation
}
