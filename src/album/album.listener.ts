import { Injectable } from '@nestjs/common';
import { AlbumService } from './album.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from 'src/shared/constnats/events';

@Injectable()
export class AlbumListener {
  constructor(private readonly albumService: AlbumService) {}

  @OnEvent(EVENTS.ARTIST.DELETED)
  async handlerArtistDeleted(artistId: string) {
    try {
      const albumsByArtistId = await this.albumService.getByArtistId(artistId);
      await Promise.all(
        albumsByArtistId.map((album) =>
          this.albumService.update(album.id, { ...album, artistId: null }),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
