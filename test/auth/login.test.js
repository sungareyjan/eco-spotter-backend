const request = require('supertest');
const express = require('express');
const { sequelize } = require('../../src/models');
const routes = require('../../src/routes/index.routes');
const app = express();

app.use(express.json());
app.use('/api/', routes);

beforeAll(async () => {
    await sequelize.sync({ force: true });

    // create a user for login
    await request(app)
        .post('/api/register')
        .send({
            username: "juan_dela_cruz",
            email: "juandelacruz@gmail.com",
            password: "password123"
        });
}, 20000);

afterAll(async () => {
    await sequelize.close();
});

describe('User Authentication', () => {
    it('should login successfully', async () => {
        const res = await request(app)
            .post('/api/login')
            .send({
                email: "juandelacruz@gmail.com",
                password: "password123"
            });

        console.log(res.body); // for debugging

        expect(res.statusCode).toBe(200);
        expect(res.body.user).toBeDefined();
        expect(res.body.user.username).toBe('juan_dela_cruz');
        expect(res.body.user.email).toBe('juandelacruz@gmail.com');
        expect(res.body.auth).toBeDefined();
        expect(res.body.auth.accessToken).toBeDefined();
        expect(res.body.auth.refreshToken).toBeDefined();
        expect(res.body.auth.tokenType).toBe('Bearer');
        expect(res.body.auth.expiresIn).toBe('3600m'); // match your env
    });
});
