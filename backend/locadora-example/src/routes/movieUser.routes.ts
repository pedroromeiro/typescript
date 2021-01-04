import { Router } from 'express';
import { getRepository, Like } from 'typeorm';
import { auth } from '../middlewares/auth';
import Movie from '../models/Movie';
import User from '../models/User';
import UserHasMovie from '../models/UserHasMovie';

const movieUserRouter = Router();


movieUserRouter.post('/', auth, async (request, response) => {
  try {
    const rep = getRepository(UserHasMovie);
    const userRep = getRepository(User);

    const movieRep = getRepository(Movie);


    
    const idUser = (request.user as any).id
    const {idMovie} = request.body;
    
    const movie = await movieRep.findOne(idMovie);
    const user = await userRep.findOne(idUser);

    if(!user) {
      return response.status(401).json({message: "Sem autorização."});
    }

    const rentedMovies = await rep.count({where: {idMovie, returned: false, returnedAt: null}})



    //tratamento de erros
    if(!movie) {
      throw new Error("Informe um filme válido.");
    }

    //verifica se há cópias para locação
    if(!(movie.amount >= rentedMovies)) {
      throw new Error("Não há mais copias desse filme disponíveis");
    }

    if(!user) {
      return response.status(401).json({message: "Sem autorização."})
    }

    const res = await rep.save({idMovie, idUser, returnedAt:null});

    response.status(201).json(res);

  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({message: err.message});
  }
});

movieUserRouter.get('/available', auth, async (request, response) => {
  try {
    const userRep = getRepository(User);
    const movieRep = getRepository(Movie);
    
    const user = await userRep.findOne((request.user as any).id);
    
    if(!user) {
      return response.status(401).json({message: "Sem autorização."})
    }
    var res : object[] = []

    const rep = getRepository(UserHasMovie);
    
    const movies = await movieRep.find();

    const pushRes = async (v: Movie) => {
      const rentedMovies = await rep
      .count({where: {idMovie: v.id, returned: false, returnedAt: null}, relations:['Movie', 'Movie.Category', 'Movie.Director']});
      if(v.amount > rentedMovies) {
        await res.push(v);
      }
    }

    await Promise.all(
      movies.map(pushRes)
    );

    return response.status(200).json(res);

   
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({message: err.message});
  }
});

movieUserRouter.get('/:userId?', auth, async (request, response) => {
  try {
    const userRep = getRepository(User);
    
    const user = await userRep.findOne((request.user as any).id);
    
    if(!user) {
      return response.status(401).json({message: "Sem autorização."})
    }
    
    const rep = getRepository(UserHasMovie);

    //verifica se o parametro idUser foi preenchido
    if(request.params.userId) {
      const targetUser = await userRep.findOne(request.params.userId);

      if(!targetUser) {
        return response.status(404).json({message: "ID de usuário não encontrado."})
      }

      //verifica se o usuário que fez a requisição é mesmo passado no parâmetro idUser.
      if(user.id == (request.params as any).userId) {
        const res = await rep.find({where: {idUser: user.id}, relations:['User', 'Movie', 'Movie.Category', 'Movie.Director']});
        return response.status(200).json(res);
      } else if(user.isAdministrator)  {
        //verifica se o usuário que fez a requisição é um administrador, para so assim exibir
        //dados de outros usuários
        const res = await rep.find({where: {idUser: request.params.userId}, 
        relations:['User', 'Movie', 'Movie.Category', 'Movie.Director']});
        return response.status(200).json(res);
      }
    } else {
      if(user.isAdministrator) {
        //já que o parâmetro idUser não foi preenchido, verifica-se o usuário que fez a requisição é
        //administrador, se sim, retorna todos os registros
        const res = await rep.find({relations:['User', 'Movie', 'Movie.Category', 'Movie.Director']});
        return response.status(200).json(res);
      }else {
        //caso o usuário não seja um administrador somente irá retornar seus próprios registros
        const res = await rep.find({where: {idUser: user.id}, relations:['User', 'Movie', 'Movie.Category', 'Movie.Director']});
        return response.status(200).json(res);
      }
    }
   
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({message: err.message});
  }
});




movieUserRouter.put('/return/:id', auth, async (request, response) => {
  try {
    const rep = getRepository(UserHasMovie);
    const userRep = getRepository(User);
    
    const user = await userRep.findOne((request.user as any).id);
    
    
    if(!user) {
      return response.status(401).json({message: "Você não tem autorização para realizar essa ação."});
    }
      
    const movieUser = await rep.findOne(request.params.id, 
      {where: {idUser: (request.user as any).id, returnedAt:null, returned: false}});
    if(!movieUser) {
      throw new Error("Esse filme não existe ou já foi devolvido.");
    }
    
    //verifica se o registro de locação existe
    //verifica se o usuário que fez a requisição é um administrador
        
    rep.merge(movieUser, {returned: true, returnedAt: new Date});
    const res = await rep.save(movieUser);
    return response.status(201).json(res)
    




  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json({message: err.message});
  }
});

export default movieUserRouter;
