import dotenv from 'dotenv';

dotenv.config();
export const dbConfig = {
    user: process.env.INVENTORY_DB_USER,
    password: process.env.INVENTORY_DB_PASSWORD,
    host: process.env.INVENTORY_DB_HOST,
    port: process.env.DATABASE_PORT,
    database: process.env.INVENTORY_DB_NAME
};
