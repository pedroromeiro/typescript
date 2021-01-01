import express from 'express';
import deletePassword from './middlewares/deletePassword';
import routes from './routes';

const app = express();
app.use(express.json());
app.use(routes);

export default app;
