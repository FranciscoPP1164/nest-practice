import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';

//The modules are the principal building blocks of Nest
@Module({
  controllers: [CatsController],
  imports: [TypeOrmModule.forFeature([Cat])],
  //The providers are all of class that
  providers: [CatsService],
  //With exports we can export components from a module to another one
  exports: [CatsService],
})
export class CatsModule {}
