import express from 'express';
import router from './routes/movies.route';
import { setupSwagger } from './swagger';

const app = express();

app.use(express.json());
app.use('/api', router);
setupSwagger(app);

export default app;
