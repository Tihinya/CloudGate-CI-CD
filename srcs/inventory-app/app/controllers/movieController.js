import {
    getAllMoviesFromDB,
    getMovieByIdFromDB,
    getMoviesByTitleFromDB,
    createMovieInDB,
    deleteAllMoviesFromDB,
    deleteMovieByIdFromDB,
    updateMovieByIdInDB
} from '../models/movieModel.js';

export const getAllMovies = async (req, res) => {
    try {
        const result = await getAllMoviesFromDB();
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movies', message: err.message });
    }
};

export const getMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await getMovieByIdFromDB(id);
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movie', message: err.message });
    }
};

export const getMoviesByTitle = async (req, res) => {
    const { title } = req.query;
    if (!title) {
        return res.status(400).json({ error: 'Title parameter is required' });
    }
    try {
        const result = await getMoviesByTitleFromDB(title);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching movies', message: err.message });
    }
};

export const createMovie = async (req, res) => {
    const { title, description } = req.body;
    try {
        const result = await createMovieInDB(title, description);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error inserting movie', message: err.message });
    }
};

export const deleteAllMovies = async (req, res) => {
    try {
        await deleteAllMoviesFromDB();
        res.status(200).json({ message: 'All movies deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting movies', message: err.message });
    }
};

export const deleteMovieById = async (req, res) => {
    const { id } = req.params;
    try {
        await deleteMovieByIdFromDB(id);
        res.status(200).json({ message: `Movie with id ${id} deleted successfully` });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting movie', message: err.message });
    }
};

export const updateMovieById = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const result = await updateMovieByIdInDB(id, title, description);
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: 'Error updating movie', message: err.message });
    }
};
