import sqlite3 from 'sqlite3';

export class MoviesRepository {
    constructor(private db: sqlite3.Database) {}

    getAllMovies(limit: number, offset: number): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT imdbId, title, genres, releaseDate, printf('$%.2f', budget) AS budget FROM movies LIMIT ? OFFSET ?`,
                [limit, offset],
                (err, rows) => (err ? reject(err) : resolve(rows))
            );
        });
    }

    getMovieById(imdbId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT * FROM movies WHERE imdbId = ?`,
                [imdbId],
                (err, row) => (err ? reject(err) : resolve(row))
            );
        });
    }

    getMoviesByYear(
        year: number,
        limit: number,
        offset: number,
        sort: string
    ): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT imdbId, title, genres, releaseDate AS release_date,
                        printf('$%.2f', budget / 1000000.0 * 1000000.0) AS budget
                 FROM movies
                 WHERE strftime('%Y', releaseDate) = ?
                 ORDER BY releaseDate ${sort}
                 LIMIT ? OFFSET ?`,
                [year.toString(), limit, offset],
                (err, rows) => (err ? reject(err) : resolve(rows))
            );
        });
    }

    getMoviesByGenre(
        genre: string,
        limit: number,
        offset: number
    ): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.db.all(
                `SELECT imdbId, title, genres, releaseDate AS release_date,
                        printf('$%.2f', budget / 1000000.0 * 1000000.0) AS budget
                 FROM movies
                 WHERE LOWER(genres) LIKE ?
                 LIMIT ? OFFSET ?`,
                [`%${genre.toLowerCase()}%`, limit, offset],
                (err, rows) => (err ? reject(err) : resolve(rows))
            );
        });
    }
}
