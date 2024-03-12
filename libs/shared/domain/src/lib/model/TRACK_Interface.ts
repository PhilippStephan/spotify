import {IMAGE} from "./IMAGE_INTERFACE";
import {ARTIST_INTERFACE} from "./ARTIST_INTERFACE";

export interface TRACK_INTERFACE  {
  id: string,
  name: string,
  albumName: string,
  albumImages: IMAGE[],
  artists: ARTIST_INTERFACE[],
  duration_ms: number,
  explicit: boolean
  uri: string,
}
