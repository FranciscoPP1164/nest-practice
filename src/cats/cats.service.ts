import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat';
import { CreateCatDto } from './dto/create-cat.dto';

//Services contains the business logic and can be injected in the providers of a module
//When a module provide a service this can be used in his components with depency injection
@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto): Cat {
    this.cats.push(cat);
    console.log(this.cats);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
