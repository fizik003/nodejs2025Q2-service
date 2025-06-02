import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { randomUUID } from 'crypto';
import { Artist } from './entities/artist.entity';
import { TrackService } from 'src/track/track.service';
import { Track } from 'src/track/entities/track.entity';
import { AlbumService } from 'src/album/album.service';

@Injectable()
export class ArtistService {
  constructor(
    private readonly artistRepository: ArtistRepository,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
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
    const tracks = await this.trackService.getByArtistId(id);
    for (const track of tracks) {
      const updatedTrack: Track = { ...track, artistId: null };
      await this.trackService.update(track.id, updatedTrack);
    }

    const albums = await this.albumService.getByArtistId(id);
    for (const album of albums) {
      const updatedAlbum = { ...album, artistId: null };
      await this.albumService.update(album.id, updatedAlbum);
    }
  }
}
