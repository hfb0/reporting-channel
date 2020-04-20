import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const user = this.usersRepository.create({ ...createUserDto });

    await user.save();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.usersRepository.findOne({ email });
  }
}
