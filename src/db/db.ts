import sqlite3 from 'sqlite3';

export function createDatabases(moviesPath: string, ratingsPath: string) {
    return {
        moviesDb: new sqlite3.Database(moviesPath),
        ratingsDb: new sqlite3.Database(ratingsPath),
    };
}
