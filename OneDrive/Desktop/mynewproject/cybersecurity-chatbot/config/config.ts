export const config = {
    apiKey: process.env.API_KEY || 'your-default-api-key',
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB_CONNECTION_STRING || 'your-default-db-connection-string',
    logLevel: process.env.LOG_LEVEL || 'info',
    environment: process.env.NODE_ENV || 'development',
};