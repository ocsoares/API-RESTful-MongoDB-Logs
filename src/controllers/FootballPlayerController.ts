import { Request, Response, NextFunction } from 'express';
import { FootballPlayerModel } from '../models/FootballPlayer';
import Logger from '../config/logs';

export class FootballPlayerController {
    async registerPlayer(req: Request, res: Response, next: NextFunction) {
        return res.status(200).json({ message: 'Pegando !' });
    }
}