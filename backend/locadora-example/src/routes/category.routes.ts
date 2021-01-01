import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';

const userRouter = Router();


userRouter.post('/', async (request, response) => {
  try {
    const rep = getRepository(User);

    const {name, email, password} = request.body


    const res = await rep.save(request.body);
    return response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

userRouter.get('/', async (request, response) => {
  try {
    const rep = getRepository(User);

    const res = await rep.find();
    response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    response.status(500);
  }
});


userRouter.put('/', async (request, response) => {
    try {
      const rep = getRepository(User);
  
      const res = await rep.find();
      response.status(201).json(res);
    } catch (err) {
      console.log('err.message :>> ', err.message);
      response.status(500);
    }
});



userRouter.post('/login', async (request, response) => {
  try {
    const rep = getRepository(User);

    const {email, password} = request.body;

    const res = await rep.find({where:{email, password}});

    if(res.length )

    return response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json(err.message);
  }
});

userRouter.get('/:name', async (request, response) => {
});

export default userRouter;
