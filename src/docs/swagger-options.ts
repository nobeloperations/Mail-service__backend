import ApiDocumentation from '.';

export const swaggerOptions = {
    swaggerDefinition: {
        ...ApiDocumentation,
        basePath: '/api',
    },
    apis: ['./src/api/**/*.ts'],
};


export default swaggerOptions;