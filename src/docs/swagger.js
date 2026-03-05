    const swaggerJsdoc = require('swagger-jsdoc');
    const swaggerUi = require('swagger-ui-express');

    function setupSwagger(app) {

        // Disable swagger if production
    if (process.env.NODE_ENV === 'production') {
        return;
    }

    const options = {
    definition: {
        openapi: '3.0.0',
        info: {
        title: 'Eco Spotter API',
        version: '1.0.0',
        description: 'API documentation for Eco Spotter backend',
        },
        servers: [
        {
            url: process.env.BASE_URL || 'http://localhost:3000',
            description: 'Local server' },
        ],
    },
    apis: ['./src/routes/*.js'], // <-- JSDoc comments live in routes
    };

    const specs = swaggerJsdoc(options);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
    }

    module.exports = setupSwagger;