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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.userService.findOne(id);
  }

  @Put(':id')
  async updatePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    return await this.userService.updateUserPassword(id, updateUserPasswordDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.userService.delete(id);
  }
}
