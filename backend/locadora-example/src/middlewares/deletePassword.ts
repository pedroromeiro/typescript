import { NextFunction, Response, Request } from 'express';

export default async(request: Request, response: Response, next: NextFunction) => {
    try {
        var oldSend = response.send;

        response.send = function(data){
            //passa de string para json
            var data = JSON.parse(data);

            //delete a senha, um dado muito sensível
            delete data['password']
            response.send = oldSend
            return response.send(data)
        }
        
        next()
    } catch(err) {
        return response.status(401).json({message: err});
    }


}