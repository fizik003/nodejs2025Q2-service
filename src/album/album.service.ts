import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumRepository } from './album.repository';
import { Album } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(private readonly albumRepository: AlbumRepository) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.albumRepository.create(createAlbumDto);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  async findOne(id: string): Promise<Album> {
    const album = await this.albumRepository.findOne(id);
    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.findOne(id);
    return this.albumRepository.update(id, updateAlbumDto);
  }

  async remove(id: string): Promise<boolean> {
    await this.findOne(id);
    await this.albumRepository.remove(id);
    return true;
  }

  async getByArtistId(artistId: string): Promise<Album[]> {
    const albums = await this.findAll();
    return albums.filter((album) => album.artistId === artistId);
  }
}
