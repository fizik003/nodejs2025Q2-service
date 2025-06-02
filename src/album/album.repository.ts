import { Album } from './entities/album.entity';

export class AlbumRepository {
  private albums: Album[] = [
    {
      id: '672fabab-e693-4b39-9240-1631e0d496d6',
      name: 'Album One',
      year: 2020,
      artistId: 'c537a02b-4fbc-4cfa-94cb-32d18635a0a5',
    },
    {
      id: '40590a9e-35f6-415f-8cfa-26c17ea64ac8',
      name: 'Album Two',
      year: 2021,
      artistId: '7f7be693-ccee-44be-b0f1-e7884e616239',
    },
    {
      id: '68255a8e-038a-40d9-bec8-83c9d4620d0c',
      name: 'Album Three',
      year: 2022,
      artistId: '7f7be693-ccee-44be-b0f1-e7884e616239',
    },
  ];

  async findAll(): Promise<Album[]> {
    return this.albums;
  }

  async findById(id: string): Promise<Album> {
    return this.albums.find((album) => album.id === id);
  }

  async save(album: Album): Promise<Album> {
    const albumIndex = this.albums.findIndex(({ id }) => id === album.id);
    if (albumIndex === -1) {
      this.albums.push(album);
    } else {
      this.albums[albumIndex] = album;
    }
    return album;
  }

  async remove(id: string): Promise<boolean> {
    const initialLength = this.albums.length;
    this.albums = this.albums.filter((album) => album.id !== id);
    return this.albums.length < initialLength;
  }
}
