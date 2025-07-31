import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

//The modules are the principal building blocks of Nest
@Module({
  controllers: [CatsController],
  //The providers are all of class that
  providers: [CatsService],
})
export class CatsModule {}
