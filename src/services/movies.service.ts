import { Request, Response } from 'express';
import { moviesDb } from '../db/moviesDb';
import { ratingsDb } from '../db/ratingsDb';
import { getPagination } from '../utils/pagination';

export function listAllMovies(req: Request, res: Response) {
    const { offset, limit } = getPagination(req.query.page as string);
    const query = `
    SELECT imdbId, title, genres, releaseDate AS release_date,
          printf('$%.2f', budget / 1000000.0 * 1000000.0) AS budget
    FROM movies
    LIMIT ? OFFSET ?
  `;

    moviesDb.all(query, [Number(limit), Number(offset)], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
}

export function movieDetails(req: Request, res: Response) {
    const imdbId = req.params.id;

    const movieQuery = `
    SELECT m.imdbId, m.title, m.overview AS description, m.releaseDate AS release_date,
           printf('$%.2f', m.budget / 1000000.0 * 1000000.0) AS budget,
           m.runtime, m.genres, m.language AS original_language,
           m.productionCompanies AS production_companies,
           m.movieId
    FROM movies m WHERE m.imdbId = ?
  `;

    moviesDb.get(movieQuery, [imdbId], (err, movie) => {
        if (err || !movie)
            return res.status(404).json({ error: 'Movie not found' });

        const ratingQuery = `SELECT AVG(rating) as average_rating FROM ratings WHERE movieId = ?`;
        const mv = movie as {
            imdbId: string;
            title: string;
            description: string;
            release_date: string;
            budget: string;
            runtime: number;
            genres: string;
            original_language: any;
            production_companies: string;
            movieId?: number;
        };

        ratingsDb.get(ratingQuery, [mv.movieId], (err2, ratingRow) => {
            const rr = ratingRow as { average_rating?: number };
            if (err2) return res.status(500).json({ error: err2.message });

            delete mv.movieId; // Internal ID, not for client
            res.json({ ...mv, average_rating: rr?.average_rating || null });
        });
    });
}

export function moviesByYear(req: Request, res: Response) {
    const year = parseInt(req.params.year);
    const desc = req.query.sort === 'desc';
    const { offset, limit } = getPagination(req.query.page as string);
    const query = `
    SELECT imdbId, title, genres, releaseDate AS release_date,
          printf('$%.2f', budget / 1000000.0 * 1000000.0) AS budget
    FROM movies
    WHERE strftime('%Y', releaseDate) = ?
    ORDER BY releaseDate ${desc ? 'DESC' : 'ASC'}
    LIMIT ? OFFSET ?
  `;

    moviesDb.all(query, [year.toString(), limit, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
}

export function moviesByGenre(req: Request, res: Response) {
    const genre = req.params.genre.toLowerCase();
    const { offset, limit } = getPagination(req.query.page as string);
    const query = `
    SELECT imdbId, title, genres, releaseDate AS release_date,
          printf('$%.2f', budget / 1000000.0 * 1000000.0) AS budget
    FROM movies
    WHERE LOWER(genres) LIKE ?
    LIMIT ? OFFSET ?
  `;

    moviesDb.all(query, [`%${genre}%`, limit, offset], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
}
