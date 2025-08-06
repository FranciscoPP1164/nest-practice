import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.name = createUserDto.name;
    user.age = createUserDto.age;

    const createdUser = await this.usersRepository.save(user);

    return createdUser;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    user.name = updateUserDto.name ?? user.name;
    user.age = updateUserDto.age ?? user.age;

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException();
    }

    const deletedUser = await this.usersRepository.remove(user);
    return deletedUser;
  }
}
