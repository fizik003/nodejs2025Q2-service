import { Injectable } from '@nestjs/common';
import { Favorites, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Prisma.PromiseReturnType<typeof this.findAllQuery>> {
    return this.findAllQuery();
  }

  private async findAllQuery() {
    return this.prisma.favorites.findMany({
      where: {
        OR: [
          { artistId: { not: null } },
          { albumId: { not: null } },
          { trackId: { not: null } },
        ],
      },
      include: {
        artist: true,
        album: true,
        track: true,
      },
    });
  }

  async findFirstByQuery(
    query: Prisma.FavoritesFindFirstArgs,
  ): Promise<Favorites> {
    return this.prisma.favorites.findFirst(query);
  }

  async createTrack(id: string): Promise<Favorites> {
    return this.prisma.favorites.create({
      data: {
        trackId: id,
      },
    });
  }

  async removeTrack(favId: string): Promise<Favorites> {
    return this.removeFav(favId);
  }

  async createAlbum(id: string): Promise<Favorites> {
    return this.prisma.favorites.create({
      data: {
        albumId: id,
      },
    });
  }

  async removeAlbum(favId: string): Promise<Favorites> {
    return this.removeFav(favId);
  }

  async createArtist(id: string): Promise<Favorites> {
    return this.prisma.favorites.create({
      data: { artistId: id },
    });
  }

  async removeArtist(favId: string): Promise<Favorites> {
    return this.removeFav(favId);
  }

  private async removeFav(id: string): Promise<Favorites> {
    return this.prisma.favorites.delete({
      where: { id },
    });
  }
}
