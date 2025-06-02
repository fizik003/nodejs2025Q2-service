import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Album } from './entities/album.entity';
import { randomUUID } from 'crypto';
import { TrackService } from 'src/track/track.service';
import { Track } from 'src/track/entities/track.entity';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackService: TrackService,
  ) {}
  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const { artistId, name, year } = createAlbumDto;
    const newAlbum: Album = {
      artistId,
      name,
      year,
      id: randomUUID(),
    };
    return this.albumRepository.save(newAlbum);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findById(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    const existingAlbum = await this.findOne(id);
    const updatedAlbum: Album = { ...existingAlbum, ...updateAlbumDto };
    return this.albumRepository.save(updatedAlbum);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);

    await this.albumRepository.remove(id);

    const tracks = await this.trackService.getByAlbumId(id);
    tracks.forEach(async (track) => {
      const updatedTrack: Track = {
        ...track,
        albumId: null,
      };
      await this.trackService.update(track.id, updatedTrack);
    });
  }
}
