import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  catchError,
  Observable,
  throwError,
  timeout,
  TimeoutError,
} from 'rxjs';

//Interceptors provide use the posibility of implement logic both, before and after the execution of the request handler
//Is based in AOP (Aspect Oriented Programming), who separate the recurrent logic out of the business logic from the principal code
//With interceptors we can intercept the execution of the request handler and implement custom logic as Logging, Caching, Modify responses, etc
@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  //The intercept method receibe two arguments the ExcecutionContext and the CallHandler
  //The CallHandler implements the handle method who calls the request handler and return an Observable wth the response of the handler
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(5000),
      catchError((err) => {
        if (err instanceof TimeoutError) {
          return throwError(() => new RequestTimeoutException());
        }
        return throwError(() => err);
      }),
    );
  }
}
