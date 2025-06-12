import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from '@prisma/client';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TrackRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: createTrackDto,
    });
  }

  async findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  async findOne(id: string): Promise<Track> {
    return this.prisma.track.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return this.prisma.track.update({ where: { id }, data: updateTrackDto });
  }

  async remove(id: string): Promise<Track> {
    return this.prisma.track.delete({ where: { id } });
  }
}
