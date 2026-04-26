const { Role, User,UserProfile, RoleUser, sequelize } = require('../models');
const { setRefreshToken, getRefreshToken, deleteRefreshToken, blacklistToken, isBlacklisted} = require('./token-store.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN;


// Helper: convert env string to seconds
const parseTTL = (str) => {
    if (!str) return 3600; // fallback 1h
    const unit = str.slice(-1);
    const val = parseInt(str);
    switch (unit) {
        case 'm': return val * 60;
        case 'h': return val * 60 * 60;
        case 'd': return val * 60 * 60 * 24;
        default: return val; // assume seconds
    }
};
const ACCESS_TTL = parseTTL(JWT_EXPIRES_IN);
const REFRESH_TTL = parseTTL(JWT_REFRESH_EXPIRES_IN);

class AuthService {

    generateAccessToken(user) {
            const jti = uuidv4();

        return jwt.sign(
            { id: user.publicId, email: user.email ,jti },
            JWT_SECRET,
            { expiresIn: JWT_EXPIRES_IN }
        );
    }

    generateRefreshToken(user) {
        const jti = uuidv4();
        return jwt.sign(
            { id: user.publicId,jti },
            JWT_REFRESH_SECRET,
            { expiresIn: JWT_REFRESH_EXPIRES_IN }
        );
    }

    async buildAuthResponse(user) {
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        await setRefreshToken(user.publicId, refreshToken, REFRESH_TTL);

        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: ACCESS_TTL,
            expiresInMs: ACCESS_TTL * 1000,
            refreshExpiresIn: REFRESH_TTL,
            refreshExpiresInMs: REFRESH_TTL * 1000
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
            email        : userData.email,
            gender       : userData.gender,
            birthday     : userData.birthday,
            status       : userData.status
        };
    }

    async register(payload) {
        const transaction = await sequelize.transaction();
        try {
            const { email, password ,firstName,lastName} = payload;

            if (await User.findOne({ where: { email }, transaction })) {
                throw new Error('Email already in use');
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email,
                password: hashedPassword,
            }, { transaction });

            const userProfile = await UserProfile.create({
                userId:user.id,
                firstName,
                lastName,
            }, { transaction });

            await RoleUser.create({ user_id: user.id }, { transaction });

            await transaction.commit();

            return {
                auth: await this.buildAuthResponse(user),
                user: this.buildUserResponse(user)
            };

        } catch (error) {
            if (!transaction.finished) {
                await transaction.rollback();
            }
            throw error;
        }
    }

    async login(email, password) {
        const errorMsg ='Invalid email or password';
        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error(errorMsg);

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error(errorMsg);

        return {
            auth: await  this.buildAuthResponse(user),
            user: this.buildUserResponse(user)
        };
    }

    async refreshToken(oldToken) {
        // Verify token signature first
        let payload;
        try {
            payload = jwt.verify(oldToken, JWT_REFRESH_SECRET);
        } catch (err) {
            throw new Error('Invalid or expired refresh token');
        }

        // Check if this token JTI is already blacklisted
        if (await isBlacklisted(payload.jti)) {
            throw new Error('Token already used'); 
        }

        //  Check if token matches currently stored token in Redis
        const storedToken = await getRefreshToken(payload.id);
        if (!storedToken || storedToken !== oldToken) {
            throw new Error('Invalid refresh token'); // old token rotated or missing
        }

        // Get user
        const user = await User.findOne({ where: { publicId: payload.id } });
        if (!user) throw new Error('User not found');

        // Issue new tokens
        const accessToken = this.generateAccessToken(user);
        const refreshToken = this.generateRefreshToken(user);

        //Store new refresh token in Redis (overwrites old)
        await setRefreshToken(user.publicId, refreshToken, REFRESH_TTL);

        // Blacklist old token's JTI
        await blacklistToken(payload.jti, REFRESH_TTL);

        //Return new tokens
        return {
            accessToken,
            refreshToken,
            tokenType: 'Bearer',
            expiresIn: ACCESS_TTL,       // for access cookie
            refreshExpiresIn: REFRESH_TTL // for refresh cookie
        };
    }

    async logout(accessToken, refreshToken) {
        let publicId = null;

        if (accessToken) {
            try {
                const decoded = jwt.verify(accessToken, JWT_SECRET);

                publicId = decoded.id;

                if (decoded?.jti) {
                    await blacklistToken(decoded.jti, ACCESS_TTL);
                }
            } catch (err) {
                throw new Error(`Invalid access token: ${err.message}`);
            }
        }

        if (publicId) {
            await deleteRefreshToken(publicId);
        }

        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, JWT_REFRESH_SECRET);

                if (decoded?.jti) {
                    await blacklistToken(decoded.jti, REFRESH_TTL);
                }
            } catch (err) {
                throw new Error(`Invalid refresh token: ${err.message}`);
            }
        }

    }
}

module.exports = new AuthService();