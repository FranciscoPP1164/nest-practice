import { Cat } from 'src/cats/entities/cat.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column({ default: true })
  bread: string;

  @ManyToOne(() => Cat)
  cat: Cat;
}
