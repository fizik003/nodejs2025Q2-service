import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserUpdateInputI } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserRepository } from './user.repository';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.create(createUserDto);
  }

  async findAll(): Promise<User[]> {
    const users = await this.userRepository.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async updateUserPassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<User> {
    const { newPassword, oldPassword } = updateUserPasswordDto;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Incorrect old password`);
    }

    const userUpdateData: UserUpdateInputI = {
      password: newPassword,
      version: user.version + 1,
    };
    return this.userRepository.update(id, userUpdateData);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.userRepository.remove(id);
    return true;
  }
}
