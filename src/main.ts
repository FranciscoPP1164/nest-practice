import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TimeoutInterceptor } from './interceptors/timeout/timeout.interceptor';
import { HttpExceptionFilter } from './filters/http-exception/http-exception.filter';
// import { ValidationPipe } from './pipes/validation/validation.pipe';
import { AuthGuard } from './guards/auth/auth.guard';
import { ValidationPipe } from '@nestjs/common';

//The bootstrap method create the NestApplication instance and launch the application
async function bootstrap() {
  //app const contains the NestApplication instance
  const app = await NestFactory.create(AppModule);
  //We can register globals interceptors with the useGlobalInterceptors method
  app.useGlobalInterceptors(new TimeoutInterceptor());
  //We can register globals filters with the useGlobalFilters method
  app.useGlobalFilters(new HttpExceptionFilter());
  //We can register globals pipes with the useGlobalPipes method
  // app.useGlobalPipes(new ValidationPipe());

  //ValidationPipe uses the libraries class-validator and class-transformer to make validations to the body of the incoming request
  //For this we create the DTO's and add validations to this classes
  //With witheList we can filter the properties that not are includeds in the dto
  //With forbidNonWhitelisted we can handle an error wen the incoming request includes a prop who is not included in the dto
  //With transform we can auto parse the incoming querys, params, and body props to theirs typed values
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  //We can register globals guards with the useGlobalGuards method
  app.useGlobalGuards(new AuthGuard());
  //this is like the listen of express
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
