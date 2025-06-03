import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { randomUUID } from 'crypto';
import { Artist } from './entities/artist.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/shared/constnats/events';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto;
    const newArtist = {
      name,
      grammy,
      id: randomUUID(),
    };
    return this.artistRepository.save(newArtist);
  }

  async findAll() {
    return this.artistRepository.findAll();
  }

  async findOne(id: string) {
    const artist = await this.artistRepository.findById(id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.findOne(id);

    const updatedArtist: Artist = { ...artist, ...updateArtistDto };
    return this.artistRepository.save(updatedArtist);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.artistRepository.delete(id);

    this.eventEmitter.emit(EVENTS.ARTIST.DELETED, id);
  }
}
