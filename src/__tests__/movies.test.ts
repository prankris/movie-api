import request from 'supertest';
import app from '../app';

describe('Movies API', () => {
    it('should return paginated list of movies', async () => {
        const response = await request(app).get('/api/movies?page=1');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeLessThanOrEqual(50);
    });

    it('should return details for a specific movie', async () => {
        const response = await request(app).get('/api/movies/tt0062695');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('title');
        expect(response.body).toHaveProperty('budget');
    });

    it('should return 404 for non-existent movie', async () => {
        const response = await request(app).get('/api/movies/999999');
        expect(response.status).toBe(404);
    });
    it('should return movies by year', async () => {
        const response = await request(app).get('/api/movies/year/1994');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it('should return movies by genre', async () => {
        const response = await request(app).get('/api/movies/genre/drama');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
