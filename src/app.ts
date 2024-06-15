// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();

app.use(bodyParser.json());

// Apply routes
app.use('/api', router);

export default app;
