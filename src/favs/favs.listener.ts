import { OnEvent } from '@nestjs/event-emitter';
import { Injectable } from '@nestjs/common';
import { FavsService } from './favs.service';
import { EVENTS } from 'src/shared/constnats/events';

@Injectable()
export class FavsListener {
  constructor(private readonly favsService: FavsService) {}

  @OnEvent(EVENTS.TRACK.DELETED)
  async handleTrackDeleted(trackId: string) {
    try {
      await this.favsService.deleteTrack(trackId);
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(EVENTS.ARTIST.DELETED)
  async handleArtistDeleted(artistId: string) {
    try {
      await this.favsService.deleteArtist(artistId);
    } catch (error) {
      console.log(error);
    }
  }

  @OnEvent(EVENTS.ALBUM.DELETED)
  async handleAlbumDeleted(albumId: string) {
    try {
      await this.favsService.deleteAlbum(albumId);
    } catch (error) {
      console.log(error);
    }
  }
}
