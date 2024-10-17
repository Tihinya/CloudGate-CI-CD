import { query } from './db.js';

export const getAllMoviesFromDB = async () => {
    return query('SELECT * FROM movies');
};

export const getMovieByIdFromDB = async (id) => {
    return query('SELECT * FROM movies WHERE transaction_id = $1', [id]);
};

export const getMoviesByTitleFromDB = async (title) => {
    return query('SELECT * FROM movies WHERE title LIKE $1', [`%${title}%`]);
};

export const createMovieInDB = async (title, description) => {
    return query('INSERT INTO movies (title, description) VALUES ($1, $2) RETURNING *', [title, description]);
};

export const deleteAllMoviesFromDB = async () => {
    return query('DELETE FROM movies');
};

export const deleteMovieByIdFromDB = async (id) => {
    return query('DELETE FROM movies WHERE transaction_id = $1', [id]);
};

export const updateMovieByIdInDB = async (id, title, description) => {
    return query('UPDATE movies SET title = $1, description = $2 WHERE transaction_id = $3 RETURNING *', [title, description, id]);
};
