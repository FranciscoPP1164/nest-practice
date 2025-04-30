import { Injectable } from '@nestjs/common';
import { Cat } from 'src/cats/interfaces/cat';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat): Cat {
    this.cats.push(cat);
    console.log(this.cats);
    return cat;
  }

  findAll(): Cat[] {
    return this.cats;
  }
}
