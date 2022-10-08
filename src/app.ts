import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dashboardRoute from './routes/footballPlayerRoute';
import atlasDBConnection from './database/database';
import Logger from './config/logs';
import morganMiddleware from './middleware/morganMiddleware';
import footballPlayerRoute from './routes/footballPlayerRoute';

const server = express();

const localhost = 'http://localhost';
const port = 5000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.text({ type: 'text/json' }));

server.use(cors());

// Middlewares
server.use(morganMiddleware);

// Padroniza TODAS as Rotas para conter /api/... na URL !! <<
server.use('/api/',
    footballPlayerRoute
);

server.listen(port, async () => {
    await atlasDBConnection();

    Logger.info(`Servidor rodando remotamente em ${localhost}:${port}`);
});