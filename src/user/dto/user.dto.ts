import { Exclude, Expose, Transform } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  login: string;

  @Expose()
  version: number;

  @Expose()
  @Transform(({ value }) => value?.getTime())
  createdAt: number;

  @Expose()
  @Transform(({ value }) => value?.getTime())
  updatedAt: number;

  @Exclude()
  password: string;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
