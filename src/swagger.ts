import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API',
            version: '1.0.0',
            description: 'REST API built on SQLite using TypeScript',
        },
        servers: [
            {
                url: '/api', // ✅ Tells Swagger UI that all endpoints are under /api
                description: 'Base API URL',
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: import('express').Express) {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
