import { Request, Response, NextFunction } from 'express';
import { FootballPlayerModel } from '../models/FootballPlayerModel';
import Logger from '../config/logs';
import { StatusCodes } from 'http-status-codes';

export class FootballPlayerController {
    async registerPlayer(req: Request, res: Response, next: NextFunction) {
        const { name, age, current_team, height, rivals_team } = req.body;

        try {
            const createFootballPlayer = new FootballPlayerModel({
                name,
                age,
                height,
                current_team,
                rivals_team: rivals_team ? rivals_team : null
            });

            await createFootballPlayer.save();

            return res.status(StatusCodes.CREATED).json(createFootballPlayer);
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`); // Deixei esse Error porque ele vai aparecer mais Explícito nos logs !! <<
            // Aqui NÃO precisa Retornar um JSON com Erro porque já está no MIDDLEWARE que faz a Verificação !! << 
        }
    }

    async searchPlayer(req: Request, res: Response): Promise<Response> {
        const { idPlayer } = req.params;

        try {
            const searchPlayerByID = await FootballPlayerModel.findById(idPlayer);

            if (!searchPlayerByID) {
                return res.status(StatusCodes.NOT_FOUND).json({ message: 'Jogador não encontrado !' });
            }

            Logger.info(`O jogador com ID ${idPlayer} foi encontrado com sucesso !`);

            return res.json(searchPlayerByID);
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.BAD_REQUEST).json({
                error: 'Não foi possível encontrar o jogador! Verifique o ID e tente novamente.'
            });
        }
    }

    async searchAllPlayers(req: Request, res: Response): Promise<Response> {
        try {
            const searchAllPlayers = await FootballPlayerModel.find();

            if (!searchAllPlayers) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: 'Não foi possível encontrar os jogadores!'
                });
            }

            Logger.info('Jogadores encontrados !');
            return res.json(searchAllPlayers);
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Não foi possível encontrar os jogadores!'
            });
        }
    }

    async deletePlayer(req: Request, res: Response): Promise<Response> {
        const { idPlayer } = req.params;

        try {
            const deletePlayerByID = await FootballPlayerModel.findByIdAndDelete(idPlayer);

            if (!deletePlayerByID) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: 'Não foi possível deletar o jogador! Verifique o ID e tente novamente.'
                });
            }

            Logger.info(`O jogador com ID ${idPlayer} foi deletado com sucesso !`);
            return res.status(StatusCodes.ACCEPTED).json({
                message: `O jogador com ID ${idPlayer} foi deletado com sucesso !`,
                deletedPlayer: deletePlayerByID
            });
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Não foi possível deletar o jogador !'
            });
        }
    }

    async updatePlayer(req: Request, res: Response): Promise<Response> {
        const { idPlayer } = req.params;
        const { name, age, height, current_team, rivals_team } = req.body;
        // const bodyData = req.body; // Pode enviar o req.body INTEIRO, é mais simplificado, porque vai estar Preenchido devido ao Middleware de Verificação !! <<

        try {
            const updatePlayerByID = await FootballPlayerModel.findByIdAndUpdate(idPlayer, {
                name,
                age,
                height,
                current_team,
                rivals_team: rivals_team ? rivals_team : null
            });

            if (!updatePlayerByID) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    error: 'Não foi possível atualizar o jogador! Verifique o ID e tente novamente.'
                });
            }

            Logger.info(`O jogador com ID ${idPlayer} foi atualizado com sucesso !`);
            return res.json({
                message: 'Jogador atualizado com sucesso !',
                updatedPlayer: updatePlayerByID
            });
        }
        catch (error: any) {
            Logger.error(`Error: ${error.name} message: ${error.message}`);
            return res.status(StatusCodes.NOT_FOUND).json({
                error: 'Não foi possível atualizar o jogador! Verifique o ID e tente novamente.'
            });
        }
    }
}