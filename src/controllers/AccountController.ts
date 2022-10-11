import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { AccountModel } from '../models/AccountModel';
import bcrypt from 'bcrypt';

export class AccountController {
    async registerAccount(req: Request, res: Response) {
        const { name, email, password } = req.body;

        const checkName = await AccountModel.findOne({ name });

        if (checkName) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Já existe um usuário cadastrado com esse nome !'
            });
        }

        const checkEmail = await AccountModel.findOne({ email });

        if (checkEmail) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Já existe um usuário cadastrado com esse email !'
            });
        }

        try {
            const encryptedPassword = await bcrypt.hash(password, 10);

            const createAccount = new AccountModel({
                name,
                email,
                password: encryptedPassword
            });

            await createAccount.save();

            Logger.info(`O usuário com nome ${name} foi criado com sucesso !`);

            return res.status(StatusCodes.CREATED).json({
                message: 'Conta criada com sucesso !',
                createdAccount: createAccount
            });
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Aconteceu um erro no servidor ! Não foi possível registrar sua conta.'
            });
        }
    }

    // Fiz o Login com o Método GET ao invés de POST porque, pela lógica, NÃO está criando nada, e sim CONSULTANDO !! <<
    // OBS: Utilizando o Basic Authentication !!  
    async loginAccount(req: Request, res: Response) {
        // Utilizei o headers porque é mais Seguro !! <<

        // COLOCAR ISSO EM UM MIDDLEWARE e Depois passar o email e password em um req.Algo !! <<

        // PROCURAR como Usar req.headers.authorization no Middleware de Verificação !! <<
        const [hashType, hash]: any = req.headers.authorization?.split(' ');
        console.log('hashType:', hashType, 'hash:', hash);

        const [email, password]: any = Buffer.from(hash, 'base64').toString().split(':'); // Descriptando o hash base64 para pegar os Dados (que vem separados por : ) !! <<
        console.log('email:', email, 'password:', password);

        if (email.length < 1 || password.length < 1) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Insira as credencias corretamente no Basic Authorization !'
            });
        }

    }
};