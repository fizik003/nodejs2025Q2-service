import { IsInt, IsString, IsUUID, ValidateIf } from 'class-validator';

export class CreateAlbumDto {
  @IsString()
  name: string;

  @IsInt()
  year: number;

  @ValidateIf((obj) => obj.artistId !== null)
  @IsUUID()
  artistId: string | null;
}
