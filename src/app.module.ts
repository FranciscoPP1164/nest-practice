import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';

@Module({
  imports: [CatsModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('cats');
    // consumer
    //   .apply(AuthMiddleware)
    //   .forRoutes({ path: 'cats', method: RequestMethod.GET });
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'cats/:id', method: RequestMethod.DELETE })
      .forRoutes(CatsController);
  }
}
