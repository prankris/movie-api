import dotenv from 'dotenv';
dotenv.config();

/* istanbul ignore file */
export const config = {
    port: process.env.PORT || 3000,
    moviesPath: process.env.MOVIES_DB_PATH || './db/movies.db',
    ratingsPath: process.env.RATINGS_DB_PATH || './db/ratings.db',
};
