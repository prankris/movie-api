import { MoviesRepository } from '../repositories/movies.repository';
import { RatingsRepository } from '../repositories/ratings.repository';

export class MoviesService {
    constructor(
        private movieRepo: MoviesRepository,
        private ratingRepo: RatingsRepository
    ) {}

    async listAllMovies(page = 1) {
        const limit = 50;
        const offset = (page - 1) * limit;
        return this.movieRepo.getAllMovies(limit, offset);
    }

    async getMovieDetails(imdbId: string) {
        const movie = await this.movieRepo.getMovieById(imdbId);
        if (!movie) return null;
        const avgRating = await this.ratingRepo.getAverageRating(movie.movieId);
        return { ...movie, averageRating: avgRating };
    }

    async getMoviesByYear(year: number, page = 1) {
        const limit = 50;
        const offset = (page - 1) * limit;
        return this.movieRepo.getMoviesByYear(year, limit, offset);
    }

    async getMoviesByGenre(genre: string, page = 1) {
        const limit = 50;
        const offset = (page - 1) * limit;
        return this.movieRepo.getMoviesByGenre(genre, limit, offset);
    }
}
