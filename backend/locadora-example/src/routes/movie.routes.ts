import { Router } from 'express';
import { getRepository, Like } from 'typeorm';
import { auth } from '../middlewares/auth';
import Category from '../models/Category';
import Director from '../models/Director';
import Movie from '../models/Movie';
import User from '../models/User';

const movieRouter = Router();


movieRouter.post('/', auth, async (request, response) => {
  try {
    const rep = getRepository(Movie);
    const userRep = getRepository(User);

    const categoryRep = getRepository(Category);
    const directorRep = getRepository(Director);

    const user = await userRep.findOne((request.user as any).id);
    

    const {idCategory, idDirector, amount, pictureUrl, title, description, year} = request.body

    const movie = await rep.findOne({where:{ title }});

    //verifica se o diretor já existe
    if(!movie) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {

        //tratamento de erros
        if(idCategory) {
            if(!await categoryRep.findOne(idCategory)) {
                throw new Error("Categoria não encontrada, insira um id válido.")
            } 
        }
    
        if(idDirector) {
            if(!await directorRep.findOne(idDirector)) {
                throw new Error("Diretor não encontrado, insira um id válido.")
            } 
        }

        const res = await rep.save({idCategory, idDirector, amount, pictureUrl, title, description, year});
        return response.status(201).json(res);

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Esse filme já existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({message: err.message});
  }
});

movieRouter.get('/', async (request, response) => {
  try {
    const rep = getRepository(Movie);

    const res = await rep.find({order:{title: "ASC"}, relations: ["Director", "Category"]});
    response.status(200).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    response.status(400).json({message: err.message});
  }
});


movieRouter.delete('/:id', auth, async (request, response) => {
    try {
      const rep = getRepository(Movie);
      const userRep = getRepository(User);

      const user = await userRep.findOne((request.user as any).id);
      
      const movie = await rep.findOne(request.params.id);

      //verifica se o filme existe
    if(movie) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        return response.status(201).json({message: "sucesso ao remover filme",...await rep.remove(movie)})

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Esse filme não existe."});
    }
    } catch (err) {
      console.log('err.message :>> ', err.message);
      response.status(500);
    }
});



movieRouter.put('/:id', auth, async (request, response) => {
  try {
    const rep = getRepository(Movie);
    const userRep = getRepository(User);

    const categoryRep = getRepository(Category);
    const directorRep = getRepository(Director);

    const user = await userRep.findOne((request.user as any).id);
    

    const {idCategory, idDirector, amount, pictureUrl, title, description, year} = request.body

    const movie = await rep.findOne(request.params.id);

    

    //verifica se o filme já existe
    if(movie) {
      //verifica se o usuário que fez a requisição é um administrador
      if(user?.isAdministrator) {
        if(idCategory) {
            if(!await categoryRep.findOne(idCategory)) {
                throw new Error("Categoria não encontrada, insira um id válido.")
            } 
        }
    
        if(idDirector) {
            if(!await directorRep.findOne(idDirector)) {
                throw new Error("Diretor não encontrada, insira um id válido.")
            } 
        }
        rep.merge(movie, {idCategory, idDirector, amount, pictureUrl, title, description, year});
        const res = await rep.save(movie);
        return response.status(200).json(res)

      } else {
        return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
      }

    } else {
      return response.status(400).json({message: "Esse filme não existe."});
    }


  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({});
  }
});

movieRouter.get('/:title', async (request, response) => {
  try {
    const rep = getRepository(Movie);

    const res = await rep.find({where:{
      title: Like(`%${request.params.title}%`)
    }, order:{title: "ASC"}, relations: ["Director", "Category"] });
    response.status(200).json(res);
  } catch (err) {
    console.log('err.message :>> ', err.message);
    response.status(400).json({message: err.message});
  }
});

export default movieRouter;
