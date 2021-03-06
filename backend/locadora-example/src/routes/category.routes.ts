import { Router } from 'express';
import { getRepository, Like } from 'typeorm';
import { auth } from '../middlewares/auth';
import Category from '../models/Category';
import User from '../models/User';

const categoryRouter = Router();


categoryRouter.post('/', auth, async (request, response) => {
  try {
    const rep = getRepository(Category);
    const userRep = getRepository(User);

    const user = await userRep.findOne((request.user as any).id);
    

    const {description} = request.body

    const category = await rep.findOne({where:{ description }})

    //verifica se a categoria já existe
    if(!category) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {

        const res = await rep.save({description});
        return response.status(201).json(res);

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria já existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

categoryRouter.get('/', async (request, response) => {
  try {
    const rep = getRepository(Category);

    const res = await rep.find({order:{description: "ASC"}});
    response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    response.status(500);
  }
});


categoryRouter.delete('/:id', auth, async (request, response) => {
    try {
      const rep = getRepository(Category);
      const userRep = getRepository(User);

      const user = await userRep.findOne((request.user as any).id);
      
      const category = await rep.findOne(request.params.id);

      //verifica se a categoria já existe
    if(category) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        return response.status(201).json({message: "sucesso ao remover categoria",...await rep.remove(category)})

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria não existe."});
    }
    } catch (err) {
      console.log('err.message :>> ', err.message);
      response.status(500);
    }
});



categoryRouter.put('/:id', auth, async (request, response) => {
  try {
    const rep = getRepository(Category);
    const userRep = getRepository(User);

    const user = await userRep.findOne((request.user as any).id);
    

    const {description} = request.body

    const category = await rep.findOne(request.params.id);

    //verifica se a categoria já existe
    if(category) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        rep.merge(category, {description});
        const res = await rep.save(category);
        return response.status(201).json(res)

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Essa categoria não existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).send();
  }
});

categoryRouter.get('/:description', async (request, response) => {
  try {
    const rep = getRepository(Category);

    const res = await rep.find({where:{
      description: Like(`${request.params.description}%`)
    }});
    response.status(201).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    response.status(500);
  }
});

export default categoryRouter;
