import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
  exports: [ArtistService],
})
export class ArtistModule {}
