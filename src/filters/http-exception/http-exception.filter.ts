import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

import { Response, Request } from 'express';

//The filters allow us to handle the exceptions who are launche in the app
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  //The first argument is the launched expection
  //The second argument is an ArgumentHost object who contain the information of the request and the response who the controller receibed
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
