import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dog } from './entities/dog.entity';

@Module({
  controllers: [DogsController],
  imports: [TypeOrmModule.forFeature([Dog])],
  providers: [DogsService],
})
export class DogsModule {}
