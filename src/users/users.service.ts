import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hash = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hash;
    const data = await this.usersRepository.save(createUserDto);
    if (data) {
      return data;
    }
  }

  async findAll(): Promise<User[]> {
    const data = await this.usersRepository.find();
    return data;
  }

  async findOne(id: number): Promise<User> {
    const data = await this.usersRepository.findOneBy({ id });
    return data;
  }

  async update(updateUserDto: UpdateUserDto, userData: User) {
    const hash = await bcrypt.hash(updateUserDto.password, 10);
    userData.email = updateUserDto.email;
    userData.username = updateUserDto.username;
    userData.password = hash;

    const data = await this.usersRepository.save(userData);
    return data;
  }

  async remove(id: string): Promise<string> {
    await this.usersRepository.delete(id);

    return 'successfully';
  }

  async getByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
