import ApiDocumentation from '.';

export const swaggerOptions = {
    swaggerDefinition: {
        ...ApiDocumentation,
        basePath: '/',
    },
    apis: ['./src/api/**/*.ts'],
};


export default swaggerOptions;