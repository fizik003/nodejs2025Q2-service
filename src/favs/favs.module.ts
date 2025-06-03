import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';
import { AlbumModule } from 'src/album/album.module';
import { FavsRepository } from './favs.repository';
import { FavsListener } from './favs.listener';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavsRepository, FavsListener],
  imports: [TrackModule, ArtistModule, AlbumModule],
  exports: [FavsService],
})
export class FavsModule {}
