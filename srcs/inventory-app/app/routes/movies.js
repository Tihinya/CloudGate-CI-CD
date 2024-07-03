import express from 'express';
import {
    getAllMovies,
    getMovieById,
    getMoviesByTitle,
    createMovie,
    deleteAllMovies,
    deleteMovieById,
    updateMovieById
} from '../controllers/movieController.js';

const router = express.Router();

router.get('/', getAllMovies);
router.get('/:id', getMovieById);
router.get('/search', getMoviesByTitle);
router.post('/', createMovie);
router.delete('/', deleteAllMovies);
router.delete('/:id', deleteMovieById);
router.patch('/:id', updateMovieById);

export default router;