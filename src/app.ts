import express from 'express';
import router from './routes/movies.route';
import { setupSwagger } from './swagger';
import { handleShutdown } from './utils/shutdown';

const app = express();

app.use(express.json());
app.use('/api', router);
setupSwagger(app);

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));

export default app;
