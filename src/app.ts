import bodyParser from 'body-parser';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dashboardRoute from './routes/dashboardRoute';
import atlasDBConnection from './database/database';
import Logger from './config/logs';

const server = express();

const localhost = 'http://localhost';
const port = 5000;

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(bodyParser.text({ type: 'text/json' }));

server.use(cors());

// Padroniza TODAS as Rotas para conter /api/... na URL !! <<
server.use('/api/',
    dashboardRoute
);

Logger.error('ERROR');
Logger.warn('WARN');

server.listen(port, async () => {
    await atlasDBConnection();

    console.log(`Servidor rodando remotamente em ${localhost}:${port}`);
});