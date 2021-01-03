import { Router } from 'express';
import { auth } from '../middlewares/auth';
import deletePassword from '../middlewares/deletePassword';
import categoryRouter from './category.routes';
import directorRouter from './director.routes';
import movieRouter from './movie.routes';
import movieUserRouter from './movieUser.routes';
import userRoute from './user.routes';

const routes = Router();


// a função deletePassword garantirá que a senha nunca 
// será enviada na resposta da requisição 🔐
routes.use('/user', deletePassword, userRoute);

routes.use('/category', categoryRouter);

routes.use('/director', directorRouter);

routes.use('/movie/renter/', auth, movieUserRouter);

routes.use('/movie', movieRouter);



export default routes;
