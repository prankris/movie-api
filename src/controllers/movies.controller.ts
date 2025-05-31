import { Request, Response } from 'express';
import { MoviesService } from '../services/movies.service';

export class MoviesController {
    constructor(private service: MoviesService) {}

    listAllMovies = async (req: Request, res: Response) => {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const movies = await this.service.listAllMovies(page);
            res.json(movies);
        } catch (err) {
            /* istanbul ignore next */
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error';
            /* istanbul ignore next */
            res.status(500).json({ error: errorMessage });
        }
    };

    movieDetails = async (req: Request, res: Response) => {
        try {
            const movie = await this.service.getMovieDetails(req.params.imdbId);
            if (!movie)
                return res.status(404).json({ error: 'Movie not found' });
            res.json(movie);
        } catch (err) {
            /* istanbul ignore next */
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error';
            /* istanbul ignore next */
            res.status(500).json({ error: errorMessage });
        }
    };

    moviesByYear = async (req: Request, res: Response) => {
        try {
            const year = parseInt(req.params.year);
            if (isNaN(year)) {
                return res.status(400).json({ error: 'Invalid year' });
            }
            const page = parseInt(req.query.page as string) || 1;
            const movies = await this.service.getMoviesByYear(year, page);
            res.json(movies);
        } catch (err) {
            /* istanbul ignore next */
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error';
            /* istanbul ignore next */
            res.status(500).json({ error: errorMessage });
        }
    };

    moviesByGenre = async (req: Request, res: Response) => {
        try {
            const genre = req.params.genre;
            if (!genre) {
                return res.status(400).json({ error: 'Genre is required' });
            }
            const page = parseInt(req.query.page as string) || 1;
            const movies = await this.service.getMoviesByGenre(genre, page);
            res.json(movies);
        } catch (err) {
            /* istanbul ignore next */
            const errorMessage =
                err instanceof Error ? err.message : 'Internal server error';
            /* istanbul ignore next */
            res.status(500).json({ error: errorMessage });
        }
    };
}
