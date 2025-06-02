import { Track } from './entities/track.entity';

export class TrackRepository {
  private tracks: Track[] = [
    {
      id: '701e80f9-7b04-4c64-a720-6bbd22533daf',
      albumId: null,
      artistId: null,
      duration: 100,
      name: 'Track1',
    },
    {
      id: '3108e644-8be0-404d-8194-5f5f9e66d694',
      albumId: null,
      artistId: null,
      duration: 200,
      name: 'Track2',
    },
  ];

  async findAll(): Promise<Track[]> {
    return this.tracks;
  }

  async findById(id: string): Promise<Track> {
    return this.tracks.find((track) => track.id === id);
  }

  async save(track: Track): Promise<Track> {
    const trackIndex = this.tracks.findIndex(({ id }) => id === track.id);
    if (trackIndex === -1) {
      this.tracks.push(track);
    }
    this.tracks[trackIndex] = track;
    return track;
  }

  async delete(id: string): Promise<boolean> {
    const countTracksBeforeDelete = this.tracks.length;
    this.tracks = this.tracks.filter((track) => track.id !== id);
    return this.tracks.length < countTracksBeforeDelete;
  }
}
