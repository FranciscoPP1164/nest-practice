import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cat } from './entities/cat.entity';
import { Repository } from 'typeorm';

//Services contains the business logic and can be injected in the providers of a module
//When a module provide a service this can be used in his components with depency injection
@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catsRepository: Repository<Cat>) {}

  findAll(): Promise<Cat[]> {
    return this.catsRepository.find();
  }

  findOne(id: number): Promise<Cat | null> {
    return this.catsRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.catsRepository.delete(id);
  }

  // create(cat: CreateCatDto): Cat {
  //   const newCat = this.catRepository.create(cat);
  //   this.catRepository.save(newCat);
  // }
}
