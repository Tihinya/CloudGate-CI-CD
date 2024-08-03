import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
    user: process.env.BILLING_DB_USER,
    password: process.env.BILLING_DB_PASSWORD,
    host: process.env.BILLING_DB_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.BILLING_DB_NAME
};
