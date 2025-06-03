import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { AlbumListener } from './album.listener';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, AlbumRepository, AlbumListener],
  exports: [AlbumService],
})
export class AlbumModule {}
