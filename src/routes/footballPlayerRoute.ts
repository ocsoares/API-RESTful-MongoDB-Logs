import { Router, Request, Response, NextFunction } from "express";
import { FootballPlayerController } from "../controllers/FootballPlayerController";
import { handleValidation } from "../middleware/handleValidation";
import { footballPlayerValidation } from "../middleware/footballPlayerValidation";
import { AuthenticationMiddleware } from "../middleware/authenticationMiddleware";

const footballPlayerRoute = Router();

const FootballPlayer = new FootballPlayerController();
const authenticationMiddleware = new AuthenticationMiddleware();

// OBS: Boa Prática nas rotas = Fazer rotas semelhantes, só mudando o verbo HTTP e os Parâmetros !! <<

footballPlayerRoute.post('/player/register', footballPlayerValidation(), handleValidation, authenticationMiddleware.checkJWT,
    FootballPlayer.registerPlayer);

footballPlayerRoute.get('/player/:idPlayer', authenticationMiddleware.checkJWT, FootballPlayer.searchPlayer);

footballPlayerRoute.get('/player', authenticationMiddleware.checkJWT, FootballPlayer.searchAllPlayers);

footballPlayerRoute.delete('/player/:idPlayer', authenticationMiddleware.checkJWT, FootballPlayer.deletePlayer);

// Para atualizar PRECISARÁ mandar o MESMO body que em register !! << 
// .patch porque pode atualizar Parcial, o PUT atualiza TOTALMENTE !! <<
footballPlayerRoute.patch('/player/:idPlayer', footballPlayerValidation(), handleValidation, authenticationMiddleware.checkJWT, FootballPlayer.updatePlayer);

export default footballPlayerRoute;