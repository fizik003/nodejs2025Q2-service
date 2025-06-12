import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';
import { Track } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(private readonly trackRepository: TrackRepository) {}

  async create(createTrackDto: CreateTrackDto) {
    return this.trackRepository.create(createTrackDto);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findOne(id);

    if (!track) {
      throw new NotFoundException(`Track with ${id} not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    await this.findOne(id);
    return this.trackRepository.update(id, updateTrackDto);
  }

  async getByAlbumId(albumId: string): Promise<Track[]> {
    const tracks = await this.findAll();
    return tracks.filter((track) => track.albumId === albumId);
  }

  async getByArtistId(artistId: string): Promise<Track[]> {
    const tracks = await this.findAll();
    return tracks.filter((track) => track.artistId === artistId);
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.trackRepository.remove(id);
    return true;
  }
}
