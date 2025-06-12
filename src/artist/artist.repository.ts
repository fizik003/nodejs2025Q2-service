import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from '@prisma/client';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createArtisDto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({ data: createArtisDto });
  }

  async findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  async findOne(id: string): Promise<Artist> {
    return this.prisma.artist.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });
  }

  async remove(id: string): Promise<Artist> {
    return this.prisma.artist.delete({
      where: { id },
    });
  }
}
