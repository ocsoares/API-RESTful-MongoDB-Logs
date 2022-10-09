import { Router, Request, Response, NextFunction } from "express";
import { FootballPlayerController } from "../controllers/FootballPlayerController";
import { handleValidation } from "../middleware/handleValidation";
import { footballPlayerValidation } from "../middleware/footballPlayerValidation";

const footballPlayerRoute = Router();

const FootballPlayer = new FootballPlayerController();

footballPlayerRoute.post('/register', footballPlayerValidation(), handleValidation, FootballPlayer.registerPlayer, (req: Request, res: Response) => {
});

export default footballPlayerRoute;