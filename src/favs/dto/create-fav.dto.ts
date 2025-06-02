import { IsArray, IsString } from 'class-validator';

export class CreateFavDto {
  @IsArray()
  @IsString({ each: true })
  artists: string[];

  @IsArray()
  @IsString({ each: true })
  albums: string[];

  @IsArray()
  @IsString({ each: true })
  tracks: string[];
}
