import { Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackListener } from './track.listener';

@Module({
  controllers: [TrackController],
  providers: [TrackService, TrackRepository, TrackListener],
  exports: [TrackService],
})
export class TrackModule {}
