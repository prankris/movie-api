import sqlite3 from 'sqlite3';
import { MoviesRepository } from '../../repositories/movies.repository';

describe('MovieRepository', () => {
    let db: sqlite3.Database;
    let repo: MoviesRepository;

    beforeEach(() => {
        db = new sqlite3.Database(':memory:'); // in-memory DB for isolation
        repo = new MoviesRepository(db);
    });
    afterEach(() => {
        db.close();
    });

    it('should throw an error if db query fails', async () => {
        // 🧪 Mock db.all to simulate DB error
        jest.spyOn(db, 'all').mockImplementation(((
            _sql: string,
            _params: any,
            callback: any
        ) => {
            callback(new Error('Simulated DB failure'), null);
        }) as unknown as typeof db.all);

        await expect(repo.getAllMovies(10, 0)).rejects.toThrow(
            'Simulated DB failure'
        );
        await expect(repo.getMoviesByYear(2020, 10, 0, 'asc')).rejects.toThrow(
            'Simulated DB failure'
        );
        await expect(repo.getMoviesByGenre('Action', 10, 5)).rejects.toThrow(
            'Simulated DB failure'
        );
    });
});
