import { Router } from 'express';
import app from '../app';
import deletePassword from '../middlewares/deletePassword';
import categoryRouter from './category.routes';
import userRoute from './user.routes';

const routes = Router();


// a função deletePassword garantirá que a senha nunca 
// será enviada na resposta da requisição 🔐
routes.use('/user', deletePassword, userRoute);

routes.use('/category', categoryRouter);

export default routes;
