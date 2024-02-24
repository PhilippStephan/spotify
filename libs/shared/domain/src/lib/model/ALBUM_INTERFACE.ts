import {ARTIST_INTERFACE, IMAGE, TRACK_INTERFACE} from "shared/domain";

export interface ALBUM_INTERFACE{
  id: string,
  name: string,
  albumImages: IMAGE[],
  artists: ARTIST_INTERFACE[],
  total_tracks: number,
  release_date: string,
  tracks?: TRACK_INTERFACE[],
}
