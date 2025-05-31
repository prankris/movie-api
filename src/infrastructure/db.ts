import sqlite3 from 'sqlite3';
import { config } from '../config';

export const moviesDb = new sqlite3.Database(config.moviesPath);
export const ratingsDb = new sqlite3.Database(config.ratingsPath);

export function closeDbConnections(): Promise<void> {
    return new Promise((resolve, reject) => {
        let closed = 0;

        const done = () => {
            closed++;
            if (closed === 2) resolve();
        };

        moviesDb.close((err) => {
            if (err) {
                console.error('Error closing moviesDb:', err);
                reject(err);
            } else {
                console.log('Closed moviesDb connection');
                done();
            }
        });

        ratingsDb.close((err) => {
            if (err) {
                console.error('Error closing ratingsDb:', err);
                reject(err);
            } else {
                console.log('Closed ratingsDb connection');
                done();
            }
        });
    });
}
