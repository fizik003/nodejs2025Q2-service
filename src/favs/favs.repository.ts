import { Fav } from './entities/fav.entity';

export class FavsRepository {
  private favs: Fav = {
    artists: [
      '7f7be693-ccee-44be-b0f1-e7884e616239',
      'c537a02b-4fbc-4cfa-94cb-32d18635a0a5',
    ],
    albums: [
      '672fabab-e693-4b39-9240-1631e0d496d6',
      '68255a8e-038a-40d9-bec8-83c9d4620d0c',
    ],
    tracks: ['3108e644-8be0-404d-8194-5f5f9e66d694'],
  };

  async findAll(): Promise<Fav> {
    return this.favs;
  }

  save(fav: Fav): Fav {
    this.favs = fav;
    return this.favs;
  }
}
