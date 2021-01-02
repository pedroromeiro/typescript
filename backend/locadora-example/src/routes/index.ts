import { Router } from 'express';
import deletePassword from '../middlewares/deletePassword';
import categoryRouter from './category.routes';
import directorRouter from './director.routes';
import userRoute from './user.routes';

const routes = Router();


// a função deletePassword garantirá que a senha nunca 
// será enviada na resposta da requisição 🔐
routes.use('/user', deletePassword, userRoute);

routes.use('/category', categoryRouter);

routes.use('/director', directorRouter);

export default routes;
