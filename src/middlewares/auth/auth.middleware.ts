import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

//The middleware are injectables who are excecuted between the request client and the Nest Route Handler
//The middlewares supports the Depency injection with the constructor
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  //The use method is the function that's executed as the middleware
  use(req: Request, res: Response, next: () => void) {
    console.log('Verifying if user is authenticated!');
    next();
  }
}
