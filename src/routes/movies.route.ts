import { Router } from 'express';
import { listAllMovies, movieDetails, moviesByYear, moviesByGenre } from '../services/movies.service';

const router = Router();

router.get('/movies', listAllMovies);
router.get('/movies/:id', movieDetails);
router.get('/movies/year/:year', moviesByYear);
router.get('/movies/genre/:genre', moviesByGenre);

export default router;
