import { Module } from '@nestjs/common';
import { UsersService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UserController],
  providers: [UsersService, UserRepository, PrismaService],
})
export class UserModule {}
