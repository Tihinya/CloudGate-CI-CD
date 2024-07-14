import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
    user: process.env.INVENTORY_POSTGRES_USER,
    password: process.env.INVENTORY_POSTGRES_PASSWORD,
    host: process.env.INVENTORY_POSTGRES_HOST,
    port: process.env.INVENTORY_POSTGRES_PORT,
    database: process.env.MOVIES_DB
};
