
const request = require('supertest');
const express = require('express');
const { sequelize } = require('../src/models');
const routes = require('../src/routes/index.routes');
const app = express();

app.use(express.json());
app.use('/api/', routes);

beforeAll(async () => {
    await sequelize.sync({ force: true }); // reset DB before tests
});

afterAll(async () => {
    await sequelize.close();
});

describe('User CRUD with Controllers', () => {
let userId;

    // CREATE user
    it('should create a user', async () => {
        const res = await request(app)
        .post('/api/user-examples')
        .send({
                firstName    : 'Maria Clara',
                middleName   : 'de los',
                lastName     : 'Santos',
                extensionName: null,
                username     : 'maria',
                email        : 'maria@gmail.com',
                gender       : 'female',
                birthday     : '1992-07-12',
                status       : 'active',
                password     : '123456',
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.username).toBe('maria');
        userId = res.body.id;
    });

    // FIND ALL users
    it('should return all users', async () => {
        const res = await request(app).get('/api/user-examples');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);
    });

    // GET user by ID
    it('should return a single user by ID', async () => {
        const res = await request(app).get(`/api/user-examples/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(userId);
        expect(res.body.username).toBe('maria');
    });

    // UPDATE user (PUT)
    it('should update a user completely', async () => {
        const res = await request(app)
        .put(`/api/user-examples/${userId}`)
        .send({ username: 'maria_updated', email: 'maria_updated@example.com', password: 'newpass123' });

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('maria_updated');
        expect(res.body.email).toBe('maria_updated@example.com');
    });

    // PATCH user (partial update)
    it('should partially update a user', async () => {
        const res = await request(app)
        .patch(`/api/user-examples/${userId}`)
        .send({ username: 'maria_patched' });

        expect(res.statusCode).toBe(200);
        expect(res.body.username).toBe('maria_patched');
        expect(res.body.email).toBe('maria_updated@example.com');
    });

    // DELETE user
    it('should delete a user', async () => {
        const res = await request(app).delete(`/api/user-examples/${userId}`);
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('User deleted successfully');

        // Confirm user is deleted
        const check = await request(app).get(`/api/user-examples/${userId}`);
        expect(check.statusCode).toBe(404);
    });
});
