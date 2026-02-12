const { Role, User, RoleUser, sequelize } = require('../models');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN =process.env.JWT_REFRESH_EXPIRES_IN;

class AuthService {

    generateAccessToken(user) {
        return jwt.sign(
            { id: user.publicId, email: user.email },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    }

    generateRefreshToken(user) {
        return jwt.sign(
            { id: user.publicId },
            JWT_REFRESH_SECRET,
            { expiresIn: JWT_REFRESH_EXPIRES_IN }
        );
    }

    buildAuthResponse(user) {
        return {
            accessToken: this.generateAccessToken(user),
            refreshToken: this.generateRefreshToken(user),
            tokenType: 'Bearer',
            expiresIn: JWT_EXPIRES_IN
        };
    }

    buildUserResponse(user) {
        const userData = user.get ? user.get({ plain: true }) : user;

        return {
            publicId     : userData.publicId,
            firstName    : userData.firstName,
            middleName   : userData.middleName,
            lastName     : userData.lastName,
            extensionName: userData.extensionName,
            username     : userData.username,
            email        : userData.email,
            gender       : userData.gender,
            birthday     : userData.birthday,
            status       : userData.status
        };
    }

    async register(payload) {
        const transaction = await sequelize.transaction();
        try {
            const { username, email, password } = payload;

            // check existing email/username
            if (await User.findOne({ where: { email }, transaction })) {
                throw new Error('Email already in use');
            }
            if (await User.findOne({ where: { username }, transaction })) {
                throw new Error('Username already in use');
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                username,
                email,
                password: hashedPassword,
            }, { transaction });

            await RoleUser.create({
                user_id: user.id,
            }, { transaction });

            await transaction.commit();

            return {
                auth: this.buildAuthResponse(user),
                user: this.buildUserResponse(user)
            };

        } catch (error) {
            // Only rollback if transaction is not finished
            if (!transaction.finished) {
                await transaction.rollback();
            }
            throw error;
        }
    }

    async login(email, password) {
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error('Invalid email or password');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid email or password');

        return {
            auth: this.buildAuthResponse(user),
            user: {
                publicId: user.publicId,
                email   : user.email,
                username: user.username
            }
        };
    }


    async refreshToken(token) {
        try {
            const payload = jwt.verify(token, JWT_REFRESH_SECRET);
            const user = await User.findByPk(payload.id);
            if (!user) throw new Error('User not found');

            return {
                accessToken: this.generateAccessToken(user),
                tokenType  : 'Bearer',
                expiresIn  : JWT_EXPIRES_IN
            };
        } catch {
            throw new Error('Invalid or expired refresh token');
        }
    }
}

module.exports = new AuthService();
