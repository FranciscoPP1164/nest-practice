import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat';
import { CreateCatDto } from './dto/create-cat.dto';

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
