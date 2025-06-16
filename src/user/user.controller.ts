import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './user.service'; // Note: Use `UserService` (singular) to match your implementation
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { plainToInstance } from 'class-transformer';
import { UserDto } from './dto/user.dto';
import { User } from '@prisma/client';

function removePasswordFromResponse<T extends User | User[]>(
  users: T,
): T extends User[] ? UserDto[] : UserDto {
  const result = plainToInstance(UserDto, users, {
    excludeExtraneousValues: true,
  });
  return result as T extends User[] ? UserDto[] : UserDto;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.userService.create(createUserDto);
    return removePasswordFromResponse(newUser);
  }

  @Get()
  async findAll(): Promise<UserDto[]> {
    const users = await this.userService.findAll();
    return removePasswordFromResponse(users);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    return removePasswordFromResponse(user);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const updatedUser = await this.userService.updateUserPassword(
      id,
      updateUserPasswordDto,
    );
    return removePasswordFromResponse(updatedUser);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.delete(id);
  }
}
