import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FavsRepository } from './favs.repository';
import { FavsResponseI } from './entities/fav.entity';
import { TrackService } from 'src/track/track.service';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';

@Injectable()
export class FavsService {
  constructor(
    private readonly favsRepository: FavsRepository,
    private readonly trackService: TrackService,
    private readonly albumSrervice: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async getAll(): Promise<FavsResponseI> {
    const data = await this.favsRepository.findAll();
    const artists = data
      .filter(({ artistId }) => artistId)
      .map(({ artist }) => artist);

    const albums = data
      .filter(({ albumId }) => albumId)
      .map(({ album }) => album);

    const tracks = data
      .filter(({ trackId }) => trackId)
      .map(({ track }) => track);

    return { artists, albums, tracks };
  }

  async addTrack(trackId: string) {
    try {
      await this.trackService.findOne(trackId);
      return this.favsRepository.createTrack(trackId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Track with id ${trackId} not found`,
        );
      }
    }
  }

  async deleteTrack(trackId: string) {
    const fav = await this.favsRepository.findFirstByQuery({
      where: { trackId },
    });

    if (!fav) {
      throw new NotFoundException(
        `Track with ID ${trackId} not found in favorites`,
      );
    }

    return await this.favsRepository.removeTrack(fav.id);
  }

  async addAlbum(albumId: string) {
    try {
      await this.albumSrervice.findOne(albumId);
      return this.favsRepository.createAlbum(albumId);
    } catch (errro) {
      if (errro instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Album with id ${albumId} not found`,
        );
      }
    }
  }

  async deleteAlbum(albumId: string) {
    const fav = await this.favsRepository.findFirstByQuery({
      where: { albumId },
    });
    if (!fav) {
      throw new NotFoundException(
        `Album with ID ${albumId} not found in favorites`,
      );
    }
    return this.favsRepository.removeAlbum(fav.id);
  }

  async addArtist(artistId: string) {
    try {
      await this.artistService.findOne(artistId);
      return this.favsRepository.createArtist(artistId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new UnprocessableEntityException(
          `Artist with id ${artistId} not found`,
        );
      }

      throw error;
    }
  }

  async deleteArtist(artistId: string) {
    const fav = await this.favsRepository.findFirstByQuery({
      where: { artistId },
    });
    if (!fav) {
      throw new NotFoundException(
        `Artist with ID ${artistId} not found in favorites`,
      );
    }
    return await this.favsRepository.removeArtist(fav.id);
  }
}
