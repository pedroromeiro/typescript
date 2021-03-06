import { Router } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/User';
import { validate } from 'class-validator';
import jwt from 'jsonwebtoken';
import { auth } from '../middlewares/auth';
import config from '../config/key.json';

const userRouter = Router();


userRouter.post('/register', async (request, response) => {
  try {
    const rep = getRepository(User);

    const {name, email, password} = request.body

    const user = rep.create({name, email, password, isAdministrator:true});

    const err = await validate(user);

    if(err.length === 0) {
      if(!await rep.findOne({where:{email: user.email}})) {
        const res = await rep.save(user)
        const token = jwt.sign({id: res.id}, config.JWT_SECRET);
        
        /*==================================   ATENÇÃO   ======================================
        #    - Para quesito de testes TODOS os usuários serão cadastrados como ADMINISTRADORES, #
        #  o projeto não pode ser usado em produção como está atualmente.                     #
        #  Caso precise, mude a opção isAdministrator para false.
        #                                   ~Pedro Romeiro                                    #
        #====================================================================================*/
        return response.status(201).json({...user, password:undefined, jwt: token});
        
      } else {
        throw new Error("Esse e-mail já pertence a uma conta.")
      }

    } else {
      return response.status(400).json({errors:err});
    }


  } catch (err) {
    console.log('aaa')
    console.log('err.message :>> ', err);
    return response.status(400).json({message: err.message})
  }
});

userRouter.get('/:id?', auth ,async (request, response) => {
  try {
    const rep = getRepository(User);

    const userReq = await rep.findOne((request.user as any).id)

    if(!userReq) {
      return response.status(403).json({message: "Você não tem permissão."});
    }
    if(request.params.id) {
      if(userReq.isAdministrator) {
        const res = await rep.findOne(request.params.id);
        if(res)
        return response.status(201).json({id:res.id, name:res.name, email:res.email, isAdministrator:res.isAdministrator});
      } else if (request.params.id == (request.user as any).id) {
        const res = await rep.findOne((request.user as any).id);

        if(res) return response.status(201)
        .json({id:res.id, name:res.name, email:res.email, isAdministrator: res.isAdministrator});
      }
    } else {
      if(userReq.isAdministrator) {
        const res = await rep.find();
        return response.status(201).json(res.map((v) => ({id:v.id, name:v.name, email:v.email, isAdministrator:v.isAdministrator})));
      } else {
        const res = await rep.findOne((request.user as any).id);
        if(res) return response.status(201)
        .json({id:res.id, name:res.name, email:res.email, isAdministrator: res.isAdministrator});
      }
    }
    
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(500).json({});
  }
});

userRouter.delete('/:id', auth, async (request, response) => {
  try {
    const user = getRepository(User);

    const requisitioner = await user.findOne((request.user as any).id);
    const targetUser = await user.findOne((request.params as any).id)


    //verifica se o usuário que fez a requisição é o usuário alvo
    //verifica se o usuário alvo existe

    if(targetUser) {
      if(request.user.id == request.params.id) {

          const res = await user.remove(targetUser);
          return response.status(201).json({message: "sucesso ao remover usuário", ...await user.remove(targetUser)})
      } else if (requisitioner?.isAdministrator) {
        //☝️ verifica se o usuário que fez a requisição é um administrador 👮
        
        //remoção do usuário
        return response.status(201).json({message: "sucesso ao remover usuário",...await user.remove(targetUser)});
      } else {
        return response.status(401).json({message: "Você não tem permissão para deletar esse usuário."});
      }
    } else {
      //usuário não encontrado
      return response.status(404).json({message: "Usuário não encontrado"});
    }
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(500).json({});
  }
});

userRouter.put('/:id', auth, async (request, response) => {
  try {
    const user = getRepository(User);

    const requisitioner = await user.findOne((request.user as any).id);
    const targetUser = await user.findOne((request.params as any).id)

    const {name, email, password, isAdministrator} = request.body
    //verifica se o usuário que fez a requisição é o usuário alvo
    //verifica se o usuário alvo existe
    if(targetUser) {

      //impede que um usuário sem privilégios se torne um administrador
      if (requisitioner?.isAdministrator) {
        user.merge(targetUser, {name, email, password, isAdministrator});
      } else {
        user.merge(targetUser, {name, email, password});
      }

      console.log(targetUser)
      const err = await validate(targetUser);

      if(err.length === 0) {
      
        if(request.user.id == request.params.id) {

            //atualiza os dados do usuário
          const res = await user.save(targetUser);

          //retorna dados do usuário retirando a senha
          return response.status(201).json(res)
        } else if (requisitioner?.isAdministrator) {
          //☝️ verifica se o usuário que fez a requisição é um administrador 👮
          
          //atualiza os dados do usuário
          const res = await user.save(targetUser);
          //retorna dados do usuário retirando a senha
          return response.status(201).json(res)
        } else {
          return response.status(401).json({message: "Você não tem permissão para atualizar os dados desse usuário."});
        }
      }else {
        return response.status(400).json({errors:err});
      }
    } else {
      //usuário não encontrado
      return response.status(404).json({message: "Usuário não encontrado"});
    }
    
  } catch (err) {
    console.log('err.message :>> ', err);
    return response.status(400).json(err.message);
  }
});


userRouter.post('/login', async (request, response) => {
  try {
    const rep = getRepository(User);

    const {email, password} = request.body;

    const user = await rep.findOne({where:{email, password}});

    if(user == undefined) {
      return response.status(404).json({message: "Conta inexistente ou credenciais inválidas."})
    }

    
    const token = jwt.sign({id: user.id}, config.JWT_SECRET)

    return response.status(201).json({...user, jwt: token});
  } catch (err) {
    console.log('err.message :>> ', err.message);
    return response.status(400).json(err.message);
  }
});

export default userRouter;
