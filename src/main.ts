import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout/timeout.interceptor';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
import { ValidationPipe } from './pipes/validation/validation.pipe';
import { AuthGuard } from './guards/auth/auth.guard';

//The bootstrap method create the NestApplication instance and launch the application
async function bootstrap() {
  //app const contains the NestApplication instance
  const app = await NestFactory.create(AppModule);
  //We can register globals interceptors with the useGlobalInterceptors method
  app.useGlobalInterceptors(new TimeoutInterceptor());
  //We can register globals filters with the useGlobalFilters method
  app.useGlobalFilters(new HttpExceptionFilter());
  //We can register globals pipes with the useGlobalPipes method
  app.useGlobalPipes(new ValidationPipe());
  //We can register globals guards with the useGlobalGuards method
  app.useGlobalGuards(new AuthGuard());
  //this is like the listen of express
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
