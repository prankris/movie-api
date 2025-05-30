import { Router } from 'express';
import {
    listAllMovies,
    movieDetails,
    moviesByYear,
    moviesByGenre,
} from '../services/movies.service';

const router = Router();

/**
 * @openapi
 * /movies:
 *   get:
 *     summary: Get all movies
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of movies
 */
router.get('/movies', listAllMovies);
/**
 * @openapi
 * /movies/{id}:
 *   get:
 *     summary: Get movie details by IMDb ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: IMDb ID of the movie
 *     responses:
 *       200:
 *         description: Movie details
 *       404:
 *         description: Movie not found
 */
router.get('/movies/:id', movieDetails);
/**
 * @openapi
 * /movies/year/{year}:
 *   get:
 *     summary: Get movies by release year
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema:
 *           type: integer
 *         description: Release year of the movies
 *     responses:
 *       200:
 *         description: List of movies released in the specified year
 */
router.get('/movies/year/:year', moviesByYear);
/**
 * @openapi
 * /movies/genre/{genre}:
 *   get:
 *     summary: Get movies by genre
 *     parameters:
 *       - in: path
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *         description: Genre of the movies
 *     responses:
 *       200:
 *         description: List of movies in the specified genre
 */
router.get('/movies/genre/:genre', moviesByGenre);

export default router;
