import express from 'express';
import router from './routes/movies.route';

const app = express();

app.use(express.json());
app.use('/api', router);

export default app;
