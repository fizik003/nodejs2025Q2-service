import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackRepository } from './track.repository';
import { Track } from './entities/track.entity';
import { randomUUID } from 'crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from 'src/shared/constnats/events';

@Injectable()
export class TrackService {
  constructor(
    private readonly trackRepository: TrackRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async create(createTrackDto: CreateTrackDto) {
    const { albumId, artistId, duration, name } = createTrackDto;
    const newTrack: Track = {
      albumId,
      artistId,
      duration,
      name,
      id: randomUUID(),
    };
    return this.trackRepository.save(newTrack);
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.findAll();
  }

  async findOne(id: string): Promise<Track> {
    const track = await this.trackRepository.findById(id);

    if (!track) {
      throw new NotFoundException(`Track with ${id} not found`);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    const track = await this.findOne(id);
    const updatedTrack: Track = {
      ...track,
      ...updateTrackDto,
    };
    return this.trackRepository.save(updatedTrack);
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
    await this.trackRepository.delete(id);
    this.eventEmitter.emit(EVENTS.TRACK.DELETED, id);
  }
}
