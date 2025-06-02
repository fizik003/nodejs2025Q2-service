import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateFavDto } from './dto/create-fav.dto';
import { UpdateFavDto } from './dto/update-fav.dto';
import { FavsRepository } from './favs.repository';
import { TrackService } from 'src/track/track.service';
import { ArtistService } from 'src/artist/artist.service';
import { AlbumService } from 'src/album/album.service';
import { Track } from 'src/track/entities/track.entity';
import { Fav, FavsResponseI } from './entities/fav.entity';

@Injectable()
export class FavsService {
  constructor(
    private readonly favsRepository: FavsRepository,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  async getAllFavs(): Promise<Fav> {
    return this.favsRepository.findAll();
  }

  async getAll(): Promise<FavsResponseI> {
    const favs = await this.favsRepository.findAll();
    const tracks = Promise.all(
      favs.tracks.map((trackId) => this.trackService.findOne(trackId)),
    );
    const artists = Promise.all(
      favs.artists.map((artistId) => this.artistService.findOne(artistId)),
    );
    const albums = Promise.all(
      favs.albums.map((albumId) => this.albumService.findOne(albumId)),
    );
    return {
      tracks: await tracks,
      artists: await artists,
      albums: await albums,
    };
  }

  async addTrack(trackId: string) {
    await this.trackService.findOne(trackId).catch((error) => {
      throw new UnprocessableEntityException(
        `Error fetching favorites: ${error.message}`,
      );
    });
    const favs = await this.favsRepository.findAll();
    const updatedFavs = {
      ...favs,
      tracks: [...favs.tracks, trackId],
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }

  async deleteTrack(trackId: string) {
    const favs = await this.favsRepository.findAll();
    if (!favs.tracks.includes(trackId)) {
      throw new NotFoundException(
        `Track with ID ${trackId} not found in favorites`,
      );
    }
    const updatedFavs = {
      ...favs,
      tracks: favs.tracks.filter((id) => id !== trackId),
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }

  async addAlbum(albumId: string) {
    await this.albumService.findOne(albumId).catch((error) => {
      throw new UnprocessableEntityException(
        `Error fetching favorites: ${error.message}`,
      );
    });
    const favs = await this.favsRepository.findAll();
    const updatedFavs = {
      ...favs,
      albums: [...favs.albums, albumId],
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }

  async deleteAlbum(albumId: string) {
    const favs = await this.favsRepository.findAll();
    if (!favs.albums.includes(albumId)) {
      throw new NotFoundException(
        `Album with ID ${albumId} not found in favorites`,
      );
    }
    const updatedFavs = {
      ...favs,
      albums: favs.albums.filter((id) => id !== albumId),
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }
  async addArtist(artistId: string) {
    try {
      await this.artistService.findOne(artistId);
    } catch (e) {
      throw new UnprocessableEntityException(
        `Artist with ID ${artistId} not found`,
      );
    }
    const favs = await this.favsRepository.findAll();
    const updatedFavs = {
      ...favs,
      artists: [...favs.artists, artistId],
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }
  async deleteArtist(artistId: string) {
    const favs = await this.favsRepository.findAll();
    if (!favs.artists.includes(artistId)) {
      throw new NotFoundException(
        `Artist with ID ${artistId} not found in favorites`,
      );
    }
    const updatedFavs = {
      ...favs,
      artists: favs.artists.filter((id) => id !== artistId),
    };
    await this.favsRepository.save(updatedFavs);
    return this.getAll();
  }
}
