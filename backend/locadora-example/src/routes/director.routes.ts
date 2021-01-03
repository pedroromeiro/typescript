import { Router } from 'express';
import { getRepository, Like } from 'typeorm';
import { auth } from '../middlewares/auth';
import Director from '../models/Director';
import User from '../models/User';

const directorRouter = Router();


directorRouter.post('/', auth, async (request, response) => {
  try {
    const rep = getRepository(Director);
    const userRep = getRepository(User);

    const user = await userRep.findOne((request.user as any).id);
    

    const {fullname} = request.body

    const director = await rep.findOne({where:{ fullname }})

    //verifica se o diretor já existe
    if(!director) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {

        const res = await rep.save({fullname});
        return response.status(201).json(res);

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria já existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({});
  }
});

directorRouter.get('/', async (request, response) => {
  try {
    const rep = getRepository(Director);

    const res = await rep.find({order:{fullname: "ASC"}});
    return response.status(200).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(500);
  }
});


directorRouter.delete('/:id', auth, async (request, response) => {
    try {
      const rep = getRepository(Director);
      const userRep = getRepository(User);

      const user = await userRep.findOne((request.user as any).id);
      
      const category = await rep.findOne(request.params.id);

      //verifica se a categoria já existe
    if(category) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        return response.status(200).json({message: "sucesso ao remover categoria",...await rep.remove(category)})

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria não existe."});
    }
    } catch (err) {
      console.log('err.message :>> ', err.message);
      return response.status(500);
    }
});



directorRouter.put('/:id', auth, async (request, response) => {
  try {
    const rep = getRepository(Director);
    const userRep = getRepository(User);

    const user = await userRep.findOne((request.user as any).id);
    

    const {fullname} = request.body

    const director = await rep.findOne(request.params.id);

    //verifica se a categoria já existe
    if(director) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        rep.merge(director, {fullname});
        const res = await rep.save(director);
        return response.status(200).json(res)

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria não existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({});
  }
});

directorRouter.get('/:fullname', async (request, response) => {
  try {
    const rep = getRepository(Director);

    const res = await rep.find({where:{
      fullname: Like(`%${request.params.fullname}%`)
    }});
    return response.status(200).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(500);
  }
});

export default directorRouter;
