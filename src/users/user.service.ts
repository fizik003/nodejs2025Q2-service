import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';
import { User, UserWithoutPassword } from './entities/user.entity';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const newUser: User = {
      login,
      password,
      id: randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    };

    return this.userRepository.save(newUser);
  }

  async findAll(): Promise<Omit<User, 'password'>[]> {
    const users = await this.userRepository.findAll();
    if (!users) {
      throw new NotFoundException('Users not found');
    }
    return users.map(this.removePasswordFiled);
  }

  async findOne(id: string): Promise<Omit<User, 'password'>> {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user) {
      return this.removePasswordFiled(user);
    }
  }

  async updateUserPassword(
    id: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ): Promise<UserWithoutPassword> {
    const { newPassword, oldPassword } = updateUserPasswordDto;
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException(`Incorrect old password`);
    }

    const updatedUser: User = {
      ...user,
      password: newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };
    const newUser = await this.userRepository.save(updatedUser);
    return this.removePasswordFiled(newUser);
  }

  async delete(id: string) {
    await this.findOne(id);
    await this.userRepository.delete(id);
  }

  private removePasswordFiled(user: User): UserWithoutPassword {
    const { password: _, ...resetUserData } = user;
    return resetUserData;
  }
}
