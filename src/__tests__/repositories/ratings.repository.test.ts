import sqlite3 from 'sqlite3';
import { RatingsRepository } from '../../repositories/ratings.repository';
import { after } from 'node:test';

describe('RatingsRepository', () => {
    let db: sqlite3.Database;
    let repo: RatingsRepository;

    beforeEach(() => {
        db = new sqlite3.Database(':memory:'); // in-memory DB for isolation
        repo = new RatingsRepository(db);
    });
    afterEach(() => {
        db.close();
    });

    it('should throw an error if db query fails', async () => {
        // 🧪 Mock db.get to simulate DB error
        jest.spyOn(db, 'get').mockImplementation(((
            _sql: string,
            _params: any,
            callback: any
        ) => {
            callback(new Error('Simulated DB failure'), null);
        }) as unknown as typeof db.get);

        await expect(repo.getAverageRating(100)).rejects.toThrow(
            'Simulated DB failure'
        );
    });
});
