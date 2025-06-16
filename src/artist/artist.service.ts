import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(private readonly artistRepository: ArtistRepository) {}

  async create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.artistRepository.create(createArtistDto);
  }

  async findAll(): Promise<Artist[]> {
    return this.artistRepository.findAll();
  }

  async findOne(id: string): Promise<Artist> {
    const artist = await this.artistRepository.findOne(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    await this.findOne(id);
    return this.artistRepository.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.artistRepository.remove(id);
    return true;
  }
}
