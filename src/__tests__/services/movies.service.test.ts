import { MoviesRepository } from '../../repositories/movies.repository';
import { RatingsRepository } from '../../repositories/ratings.repository';
import { MoviesService } from '../../services/movies.service';

const mockMoviesRepo = {
    getAllMovies: jest.fn(),
    getMovieById: jest.fn(),
    getMoviesByGenre: jest.fn(),
    getMoviesByYear: jest.fn(),
};
const mockRatingsRepo = {
    getAverageRating: jest.fn(),
};

const service = new MoviesService(
    mockMoviesRepo as unknown as MoviesRepository,
    mockRatingsRepo as unknown as RatingsRepository
);

describe('MovieService', () => {
    describe('getMoviesByGenre', () => {
        it('throws if genre is missing', async () => {
            await expect(service.getMoviesByGenre('')).rejects.toThrow(
                'Genre is required'
            );
        });

        it('returns data if genre is valid', async () => {
            mockMoviesRepo.getMoviesByGenre.mockResolvedValue([
                { title: 'Test Movie' },
            ]);
            const result = await service.getMoviesByGenre('Action');
            expect(result).toEqual([{ title: 'Test Movie' }]);
        });
    });

    describe('getMoviesByYear', () => {
        it('throws if year is invalid', async () => {
            await expect(service.getMoviesByYear(1800)).rejects.toThrow(
                'Invalid year'
            );
        });

        it('throws if sort is invalid', async () => {
            await expect(
                service.getMoviesByYear(2020, 1, 'asdf')
            ).rejects.toThrow('Invalid sort order');
        });

        it('returns data if inputs are valid', async () => {
            mockMoviesRepo.getMoviesByYear.mockResolvedValue([
                { title: 'Another Movie' },
            ]);
            const result = await service.getMoviesByYear(2020, 1);
            expect(result).toEqual([{ title: 'Another Movie' }]);
        });
    });
});
