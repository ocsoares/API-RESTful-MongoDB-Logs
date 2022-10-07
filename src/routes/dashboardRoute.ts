import { Router, Request, Response, NextFunction } from "express";

const dashboardRoute = Router();

dashboardRoute.get('/teste', (req: Request, res: Response<{ message: string; }>) => {
    res.json({ message: 'Servidor online !' });
});

export default dashboardRoute;