import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '@prisma/client';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  async findOne(id: string): Promise<Album> {
    return this.prisma.album.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string): Promise<Album> {
    return this.prisma.album.delete({ where: { id } });
  }
}
