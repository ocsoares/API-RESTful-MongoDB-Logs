import { Router, Request, Response, NextFunction } from "express";
import { FootballPlayerController } from "../controllers/FootballPlayerController";
import { handleValidation } from "../middleware/handleValidation";
import { footballPlayerValidation } from "../middleware/footballPlayerValidation";

const footballPlayerRoute = Router();

const FootballPlayer = new FootballPlayerController();

// OBS: Boa Prática nas rotas = Fazer rotas semelhantes, só mudando o verbo HTTP e os Parâmetros !! <<

footballPlayerRoute.post('/player/register', footballPlayerValidation(), handleValidation, FootballPlayer.registerPlayer, (req: Request, res: Response) => {
});

footballPlayerRoute.get('/player/:idPlayer', FootballPlayer.searchPlayer);

footballPlayerRoute.get('/player', FootballPlayer.searchAllPlayers);

footballPlayerRoute.delete('/player/:idPlayer', FootballPlayer.deletePlayer);

// Para atualizar PRECISARÁ mandar o MESMO body que em register !! << 
// .patch porque pode atualizar Parcial, o PUT atualiza TOTALMENTE !! <<
footballPlayerRoute.patch('/player/:idPlayer', footballPlayerValidation(), handleValidation, FootballPlayer.updatePlayer);

export default footballPlayerRoute;