import {
    closeDbConnections,
    moviesDb,
    ratingsDb,
} from '../../infrastructure/db';

describe('DB Infrastructure', () => {
    it('should initialize movie and ratings DBs', () => {
        expect(moviesDb).toBeDefined();
        expect(ratingsDb).toBeDefined();
    });

    it('should close db connections without error', async () => {
        // Mock close to test logic without actually closing SQLite3
        const movieClose = jest
            .spyOn(moviesDb, 'close')
            .mockImplementation((cb) => {
                if (cb) cb(null);
            });
        const ratingsClose = jest
            .spyOn(ratingsDb, 'close')
            .mockImplementation((cb) => {
                if (cb) cb(null);
            });

        await expect(closeDbConnections()).resolves.toBeUndefined();

        expect(movieClose).toHaveBeenCalled();
        expect(ratingsClose).toHaveBeenCalled();

        movieClose.mockRestore();
        ratingsClose.mockRestore();
    });

    it('should handle close errors', async () => {
        const error = new Error('Close failed');

        jest.spyOn(moviesDb, 'close').mockImplementation((cb) => {
            if (cb) cb(error);
        });
        jest.spyOn(ratingsDb, 'close').mockImplementation((cb) => {
            if (cb) cb(null);
        });

        await expect(closeDbConnections()).rejects.toThrow('Close failed');
    });
});
