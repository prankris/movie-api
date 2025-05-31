import request from 'supertest';
import app from '../app';

let server: any;

beforeAll((done) => {
    server = app.listen(0, done);
});

afterAll((done) => {
    // Close the server or database connections if necessary
    server.close(done);
});

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
        expect(response.body.title).toEqual('Stolen Kisses');
        expect(response.body.overview).toEqual(
            "Baisers voles is the second of two films from the ‘Antonie-Doinel-Zyklus’ by French director Truffaut. The film depicts the life of a young twenty year old man who’s life revolves around casual jobs and women, especially young violinist Christine Darbon (Claude Jade's screen-debut)."
        );
        expect(response.body.productionCompanies).toEqual(
            '[{"name": "Les Films du Carrosse", "id": 53}, {"name": "Les Productions Artistes Associés", "id": 64}]'
        );
        expect(response.body.releaseDate).toEqual('1968-08-13');
        expect(response.body.budget).toEqual(350000);
        expect(response.body.revenue).toEqual(0);
        expect(response.body.runtime).toEqual(96);
        expect(response.body.language).toEqual(null);
        expect(response.body.genres).toEqual(
            '[{"id": 35, "name": "Comedy"}, {"id": 18, "name": "Drama"}, {"id": 10749, "name": "Romance"}]'
        );
        expect(response.body.status).toEqual('Released');
        expect(response.body.averageRating).toEqual(2.2);
    });

    it('should not return rating when missing', async () => {
        const response = await request(app).get('/api/movies/tt0105695');
        expect(response.status).toBe(200);
        expect(response.body.average_rating).toBeUndefined();
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
    it('should return movies by year in descending order', async () => {
        const response = await request(app).get(
            '/api/movies/year/1994?page=2&sort=desc'
        );
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
    it('should return 400 for invalid sort order', async () => {
        const response = await request(app).get(
            '/api/movies/year/1994?page=2&sort=invalid'
        );
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid sort order');
    });
    it('should return 400 for non-numeric year', async () => {
        const response = await request(app).get('/api/movies/year/test');
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error', 'Invalid year');
    });
    it('should return movies by genre', async () => {
        const response = await request(app).get('/api/movies/genre/drama');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});
