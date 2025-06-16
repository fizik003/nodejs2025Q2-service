import { Module } from '@nestjs/common';
import { FavsService } from './favs.service';
import { FavsController } from './favs.controller';
import { FavsRepository } from './favs.repository';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from 'src/track/track.module';
import { ArtistModule } from 'src/artist/artist.module';

@Module({
  controllers: [FavsController],
  providers: [FavsService, FavsRepository],
  imports: [PrismaModule, AlbumModule, TrackModule, ArtistModule],
})
export class FavsModule {}
