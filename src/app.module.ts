import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  ValidationPipe,
} from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { DogsModule } from './dogs/dogs.module';
import { logger } from './middlewares/logger/logger.middleware';

//The principal module of the application, here we import all of the modules and configure middlewares
@Module({
  imports: [CatsModule, DogsModule],
  controllers: [],
  providers: [ValidationPipe],
})
export class AppModule implements NestModule {
  //The configure middleware abble us to register middlewares to the controllers of this module
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('cats');
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer.apply(logger).forRoutes(CatsController);
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'cats/:id', method: RequestMethod.DELETE })
      .forRoutes(CatsController);
  }
}
