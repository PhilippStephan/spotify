import {inject, Injectable} from '@angular/core';
import {ArtistMapperService} from "../artist/artist-mapper.service";
import {ARTIST_INTERFACE, TRACK_INTERFACE} from "shared/domain";
import {TrackMapperService} from "../track/track-mapper.service";
import {ALBUM_INTERFACE} from "../../../../domain/src/lib/model/ALBUM_INTERFACE";

@Injectable({
  providedIn: 'root'
})
export class AlbumMapperService {

  private artistMapper = inject(ArtistMapperService);

  mapToAlbum(album: any): ALBUM_INTERFACE{
    return {
      id: album.id,
      name: album.name,
      albumImages: album.images,
      artists: this.setArtists(album.artists),
      total_tracks: album.total_tracks,
      release_date : album.release_date,
    };
  }

  private setArtists(artists: any): ARTIST_INTERFACE[]{
    const resultArtists: ARTIST_INTERFACE[] | null = [];
    artists.forEach((artist: any) => resultArtists.push(this.artistMapper.mapToArtist(artist)));
    return resultArtists;
  }
}
