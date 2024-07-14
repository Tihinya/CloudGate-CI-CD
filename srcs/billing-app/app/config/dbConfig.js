import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
    user: process.env.BILLING_POSTGRES_USER,
    password: process.env.BILLING_POSTGRES_PASSWORD,
    host: process.env.BILLING_POSTGRES_HOST,
    port: process.env.BILLING_POSTGRES_PORT,
    database: process.env.ORDERS_DB
};
