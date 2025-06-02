import { Artist } from './entities/artist.entity';

export class ArtistRepository {
  private artists: Artist[] = [
    {
      id: '7f7be693-ccee-44be-b0f1-e7884e616239',
      name: 'Artist1',
      grammy: true,
    },
    {
      id: 'c537a02b-4fbc-4cfa-94cb-32d18635a0a5',
      name: 'Artist2',
      grammy: false,
    },
  ];

  async findAll(): Promise<Artist[]> {
    return this.artists;
  }
  async findById(id: string): Promise<Artist> {
    return this.artists.find((artist) => artist.id === id);
  }
  async save(artist: Artist): Promise<Artist> {
    const artistIndex = this.artists.findIndex(({ id }) => id === artist.id);
    if (artistIndex === -1) {
      this.artists.push(artist);
    }
    this.artists[artistIndex] = artist;
    return artist;
  }
  async delete(id: string): Promise<boolean> {
    const countArtistsBeforeDelete = this.artists.length;
    this.artists = this.artists.filter((artist) => artist.id !== id);
    return this.artists.length < countArtistsBeforeDelete;
  }
}
