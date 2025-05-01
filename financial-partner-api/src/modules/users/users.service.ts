import {
  Injectable,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async register(createUserDto: CreateUserDto): Promise<User> {
    try {
      // Check if user with email exists
      const emailExists = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (emailExists) {
        throw new ConflictException('Email already exists');
      }

      // Check if user with phone exists
      const phoneExists = await this.userRepository.findOne({
        where: { phone: createUserDto.phone },
      });

      if (phoneExists) {
        throw new ConflictException('Phone number already exists');
      }

      // Create new user
      const user = this.userRepository.create(createUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new InternalServerErrorException('Error creating user');
    }
  }
}
