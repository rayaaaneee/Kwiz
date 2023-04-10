import { Router, Request, Response } from 'express';

export const Router = new Router();

Router.get('/', (req: Request , res: Response) => {
    res.send('Hello World!');
});