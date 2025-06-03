import { Injectable } from '@nestjs/common';
import { TrackService } from './track.service';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from 'src/shared/constnats/events';

@Injectable()
export class TrackListener {
  constructor(private readonly trackService: TrackService) {}

  @OnEvent(EVENTS.ARTIST.DELETED)
  async handleArtistDeleted(artistId: string) {
    try {
      const tracksByArtistId = await this.trackService.getByArtistId(artistId);
      await Promise.all(
        tracksByArtistId.map((track) =>
          this.trackService.update(track.id, { ...track, artistId: null }),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(EVENTS.ALBUM.DELETED)
  async handleAlbumDeleted(albumId: string) {
    try {
      const trackByAlbumId = await this.trackService.getByAlbumId(albumId);
      await Promise.all(
        trackByAlbumId.map((track) =>
          this.trackService.update(track.id, { ...track, albumId: null }),
        ),
      );
    } catch (error) {
      console.log(error);
    }
  }
}
