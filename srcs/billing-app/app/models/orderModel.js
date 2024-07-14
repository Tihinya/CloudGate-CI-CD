import pkg from 'pg';
const { Pool } = pkg;
import { dbConfig } from '../config/dbConfig.js';

const pool = new Pool(dbConfig);

export const insertOrder = async (userId, numberOfItems, totalAmount) => {
    const query = `
        INSERT INTO orders (user_id, number_of_items, total_amount) 
        VALUES ($1, $2, $3) 
        RETURNING *
    `;
    const values = [userId, numberOfItems, totalAmount];
    const client = await pool.connect();
    try {
        const result = await client.query(query, values);
        return result.rows[0];
    } finally {
        client.release();
    }
};