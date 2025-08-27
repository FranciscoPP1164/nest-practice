import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthMiddleware } from './middlewares/auth/auth.middleware';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { DogsModule } from './dogs/dogs.module';
import { logger } from './middlewares/logger/logger.middleware';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './guards/roles/roles.guard';
import { ConfigModule } from './config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { UsersModule } from './users/users.module';
import { ScheduleModule } from '@nestjs/schedule';

const MyService = {};

//The principal module of the application, here we import all of the modules and configure middlewares
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'nest_practice_db',
      synchronize: true,
      autoLoadEntities: true,
    }),
    ScheduleModule.forRoot(),
    CatsModule,
    DogsModule,
    ConfigModule,
    PostModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    //We can register global guards to a module this way if the guard implement a Dependency that must be injected
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    //We can create custom providers, to handle how and who's services or objects are injected
    {
      provide: 'MyService',
      useValue: MyService,
    },
  ],
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
