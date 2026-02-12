const authService = require('../services/auth.service');
const validateFields = require('../utils/validate-fields');
const codes = require('../errors/codes');
const { errorTypes } = require('../errors/errors');

const register = async (req, res, next) => {
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

            res.status(201).json({
                status : 'success',
                code   : 201,
                message: 'User registered successfully',
                data   : result
            });

        } catch (error) {
            console.error('Registration error:', error);
            next(error); //  centralized error handler
        }
    };

const login = async (req, res, next) => {
        try {
            //  Validate input fields
            const loginRules = {
                email   : { required: true, type: 'email' },
                password: { required: true, type: 'string' },
            };

            const invalidFields = validateFields(req.body, loginRules);

            if (invalidFields.length > 0) {
                return res.status(400).json({
                    code   : codes.VALIDATION_ERROR,       // code 12
                    message: 'invalid format of fields',
                    fields : invalidFields
                });
            }

            //  Proceed to login via service
            const { email, password } = req.body;
            const result = await authService.login(email, password);

            //  Return login result (JWT + user info)
            res.json(result);

        } catch (error) {
            next(
                errorTypes.Unauthorized(error.message || 'Invalid email or password')
            );
        }
    }

module.exports ={register,login};