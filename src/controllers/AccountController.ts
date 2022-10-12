import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import Logger from '../config/logs';
import { AccountModel } from '../models/AccountModel';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AccountController {
    async registerAccount(req: Request, res: Response): Promise<Response> {
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

    async loginAccount(req: Request, res: Response): Promise<Response> {

        const email = req.basicEmail;
        const password = req.basicPassword;

        try {

            const checkLogin = await AccountModel.findOne({ email });

            if (!checkLogin) {
                return res.status(StatusCodes.BAD_REQUEST).json({
                    error: 'Email ou senha inválido !'
                });
            }

            const checkPassword = await bcrypt.compare(password, checkLogin.password);

            if (!checkPassword) {
                Logger.warn(`Alguém tentou acessar a conta com o email ${checkLogin.email}, mas sem sucesso !`);
                return res.status(StatusCodes.BAD_REQUEST).json({
                    errro: 'Email ou senha inválido !'
                });
            }

            const JWT = jwt.sign({
                id: checkLogin.id,
                name: checkLogin.name,
                email: checkLogin.email
            }, "" + process.env.JWT_HASH, {
                expiresIn: '12h'
            });

            Logger.info(`Usuário com o email '${checkLogin.email}' logado com sucesso !`);

            return res.status(StatusCodes.ACCEPTED).json({
                message: 'Logado com sucesso !',
                JWT
            });
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                error: 'Aconteceu um erro no servidor. Tente novamente.'
            });
        }
    }
};