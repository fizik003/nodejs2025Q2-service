import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { TrackService } from 'src/track/track.service';
import { TrackModule } from 'src/track/track.module';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository],
  imports: [TrackModule],
  exports: [AlbumService],
})
export class AlbumModule {}
