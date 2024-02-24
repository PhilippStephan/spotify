import {Injectable} from '@angular/core';
import {ARTIST_INTERFACE} from "shared/domain";

@Injectable({
  providedIn: 'root'
})
export class ArtistMapperService {

  mapToArtist(artist: any): ARTIST_INTERFACE{
    return {
      id: artist.id,
      name: artist.name,
      images: artist.images
    };
  }
}
