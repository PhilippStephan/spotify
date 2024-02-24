import {inject, Injectable} from '@angular/core';
import {ARTIST_INTERFACE, TRACK_INTERFACE} from "shared/domain";
import {ArtistMapperService} from "shared/util-mapper";

@Injectable({
  providedIn: 'root'
})
export class TrackMapperService {

  private artistMapper = inject(ArtistMapperService);

  mapToTrack(track: any): TRACK_INTERFACE{
    return {
      id: track.id,
      name: track.name,
      albumName: track.album?.name,
      albumImages: track.album?.images,
      artists: this.setArtists(track.artists),
      duration_ms: track.duration_ms,
      explicit: track.explicit
    };
  }

  private setArtists(artists: any): ARTIST_INTERFACE[]{
    const resultArtists: ARTIST_INTERFACE[] | null = [];
    artists.forEach((artist: any) => resultArtists.push(this.artistMapper.mapToArtist(artist)));
    return resultArtists;
  }
}
