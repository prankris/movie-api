import sqlite3 from 'sqlite3';
import { config } from '../config';

export const ratingsDb = new sqlite3.Database(config.ratingsPath, (err) => {
    if (err) console.error('Ratings connection error:', err);
    else console.log('Connected to Ratings database');
});
