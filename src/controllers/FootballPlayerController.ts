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
            Logger.error(error.message);
        }
    }
}