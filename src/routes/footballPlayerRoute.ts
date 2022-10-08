import { Router, Request, Response, NextFunction } from "express";
import { FootballPlayerController } from "../controllers/footballPlayerController";

const footballPlayerRoute = Router();

const FootballPlayer = new FootballPlayerController();

footballPlayerRoute.get('/register', FootballPlayer.registerPlayer, (req: Request, res: Response) => {
});

export default footballPlayerRoute;