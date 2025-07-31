import { NextFunction, Request, Response } from 'express';

//The middlewares can be functions too if they don't need use the Dependecy Injection
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log('req...');
  next();
}
