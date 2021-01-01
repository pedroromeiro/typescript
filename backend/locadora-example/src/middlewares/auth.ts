import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import key from '../config/key.json'

export const auth = async(request: Request, response: Response, next: NextFunction) => {
    try {
        const authHeader = request.headers.authorization
    
        //checa se o token foi preenchido no header 
        if(!authHeader) {
            return response.status(401).json({message: "Token de acesso deve ser enviado na requisição."});
        }
    
        //separa o Bearer do token
        const [, token] = authHeader.split(' ');

        const decode = await jwt.verify(token, key.JWT_SECRET);
        request.user = {id: (decode as any).id}
        next()
    } catch(err) {
        return response.status(401).json({message: "Token inválido."});
    }


}