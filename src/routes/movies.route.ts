import { createDatabases } from '../db/db';
import { config } from '../config';
import { MoviesRepository } from '../repositories/movies.repository';
import { RatingsRepository } from '../repositories/ratings.repository';
import { MoviesService } from '../services/movies.service';
import { MoviesController } from '../controllers/movies.controller';
import { Router } from 'express';

const { moviesDb, ratingsDb } = createDatabases(
    config.moviesPath,
    config.ratingsPath
);

const movieRepo = new MoviesRepository(moviesDb);
const ratingRepo = new RatingsRepository(ratingsDb);
const movieService = new MoviesService(movieRepo, ratingRepo);
const controller = new MoviesController(movieService);

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
router.get('/movies', controller.listAllMovies);
/**
 * @openapi
 * /movies/{imdbId}:
 *   get:
 *     summary: Get movie details by IMDb ID
 *     parameters:
 *       - in: path
 *         name: imdbId
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
router.get('/movies/:imdbId', controller.movieDetails);
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *         description: Sort order (asc or desc)
 *     responses:
 *       200:
 *         description: List of movies released in the specified year
 *      400:
 *        description: Invalid year or sort order
 */
router.get('/movies/year/:year', controller.moviesByYear);
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
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: List of movies in the specified genre
 */
router.get('/movies/genre/:genre', controller.moviesByGenre);

export default router;
