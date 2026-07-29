import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingByUsername = await this.userRepository.findOneBy({
      username: createUserDto.username,
    });
    if (existingByUsername) {
      throw new ConflictException('Username already exists');
    }

    const existingByEmail = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (existingByEmail) {
      throw new ConflictException('Email already exists');
    }

    const user = this.userRepository.create({
      ...createUserDto,
      role: createUserDto.role ?? UserRole.CUSTOMER,
      balance: createUserDto.balance ?? 0,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      select: { id: true, username: true, email: true, role: true, balance: true },
      order: { id: 'DESC' },
    });
  }

  findByUsername(username: string) {
    return this.userRepository.findOneBy({ username });
  }

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email });
  }

  async findById(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      select: { id: true, username: true, email: true, role: true, balance: true },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
}
