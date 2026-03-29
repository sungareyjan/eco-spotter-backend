const authService = require('../services/auth.service');
const validateFields = require('../utils/validate-fields');
const codes = require('../errors/codes');
const { errorTypes } = require('../errors/errors');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
};

class AuthController {

    async register(req, res, next) {
        try {
            const { email, password, username } = req.body;
            const invalidFields = [];
            if (!email) invalidFields.push('email');
            if (!password) invalidFields.push('password');
            if (!username) invalidFields.push('username');

            if (invalidFields.length > 0) {
                throw errorTypes.BadRequest(
                    'Invalid or missing required fields',
                    invalidFields
                );
            }

            const result = await authService.register(req.body);

            // Set cookies
            res.cookie('accessToken', result.auth.accessToken, {
                ...cookieOptions,
                maxAge: parseInt(result.auth.expiresIn) * 1000
            });
            res.cookie('refreshToken', result.auth.refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.status(201).json({
                status: 'success',
                code: 201,
                message: 'User registered successfully',
                data: {
                    user: result.user
                }
            });

        } catch (error) {
            console.error('Registration error:', error);
            next(error);
        }
    }

    async login(req, res, next) {
        try {
            const loginRules = {
                email: { required: true, type: 'email' },
                password: { required: true, type: 'string' },
            };

            const invalidFields = validateFields(req.body, loginRules);
            if (invalidFields.length > 0) {
                return res.status(400).json({
                    code: codes.VALIDATION_ERROR,
                    message: 'Invalid format of fields',
                    fields: invalidFields
                });
            }

            const { email, password } = req.body;
            const result = await authService.login(email, password);

            // Set cookies
            res.cookie('accessToken', result.auth.accessToken, {
                ...cookieOptions,
                maxAge: parseInt(result.auth.expiresIn) * 1000
            });
            res.cookie('refreshToken', result.auth.refreshToken, {
                ...cookieOptions,
                maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
            });

            res.json({
                status: 'success',
                message: 'Login successful',
                data: {
                    user: result.user
                }
            });

        } catch (error) {
            next(
                errorTypes.Unauthorized(error.message || 'Invalid email or password')
            );
        }
    }

    async refreshToken(req, res, next) {
        try {
            const token = req.cookies?.refreshToken;
            console.log("COOKIE TOKEN:", req.cookies?.refreshToken);
            if (!token) return next(errorTypes.Unauthorized("No refresh token"));

            const newAuth = await authService.refreshToken(token);

            // Set new access token cookie
            res.cookie('accessToken', newAuth.accessToken, {
                ...cookieOptions,
                maxAge: parseInt(newAuth.expiresIn) * 1000
            });

            res.json({
                status: 'success',
                message: 'Access token refreshed'
            });

        } catch (error) {
            next(error);
        }
    }

    async logout(req, res) {
        res.clearCookie('accessToken', cookieOptions);
        res.clearCookie('refreshToken', cookieOptions);
        res.status(200).json({
            status: 'success',
            message: 'Logged out successfully'
        });
    }
}

module.exports = new AuthController();