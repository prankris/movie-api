import sqlite3 from 'sqlite3';

export class RatingsRepository {
    constructor(private db: sqlite3.Database) {}

    getAverageRating(movieId: number): Promise<number | null> {
        return new Promise((resolve, reject) => {
            this.db.get(
                `SELECT AVG(rating) as avgRating FROM ratings WHERE movieId = ?`,
                [movieId],
                (err, row: { avgRating: number | null }) => {
                    if (err) return reject(err);
                    resolve(row?.avgRating ?? null);
                }
            );
        });
    }
}
