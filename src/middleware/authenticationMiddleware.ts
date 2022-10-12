import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import jwt from 'jsonwebtoken';


export class AuthenticationMiddleware {
    // Fiz o Login com o Método GET ao invés de POST porque, pela lógica, NÃO está criando nada, e sim CONSULTANDO !! <<
    // OBS: Utilizando o Basic Authentication !!  
    async basicAuthentication(req: Request, res: Response, next: NextFunction) {
        // Utilizei o headers porque é mais Seguro !! <<

        try {
            const [hashType, hash]: any = req.headers.authorization?.split(' ');
            // console.log(hashType, hash);

            const [email, password] = Buffer.from(hash, 'base64').toString().split(':');
            // console.log(email, password);

            if (email.length < 1 || password.length < 1) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'Insira todas as credencias corretamente !'
                });
            }

            req.basicEmail = email;
            req.basicPassword = password;

            next();
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Insira todas as credencias corretamente no Basic Auth !'
            });
        }
    }

    async checkJWT(req: Request, res: Response, next: NextFunction) {
        const { authorization } = req.headers;

        try {
            const [tokenType, token]: any = authorization?.split(' ');

            const checkJWT = jwt.verify(token, "" + process.env.JWT_HASH);

            if (!checkJWT) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'Token inválido ou expirado !'
                });
            }

            next();
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name}, message: ${error.message}`);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Token inválido ou expirado !'
            });
        }
    }
}