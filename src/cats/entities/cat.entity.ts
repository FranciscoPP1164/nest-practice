import { Dog } from 'src/dogs/entities/dog.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: true })
  bread: string;

  @OneToMany(() => Dog, (dog) => dog.cat)
  dogs: Dog[];
}
