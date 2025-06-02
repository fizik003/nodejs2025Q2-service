import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';
import { Track } from '../entities/track.entity';

export class CreateTrackDto implements Partial<Track> {
  @IsString()
  name: string;

  @ValidateIf((obj) => obj.albumId !== null)
  @IsUUID()
  albumId: string | null;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;

  @IsInt()
  duration: number;
}
