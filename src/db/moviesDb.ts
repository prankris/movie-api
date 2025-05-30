import sqlite3 from 'sqlite3';
import { config } from '../config';

export const moviesDb = new sqlite3.Database(config.moviesPath, (err) => {
    if (err) console.error('Movies connection error:', err);
    else console.log('Connected to Movies database');
});
