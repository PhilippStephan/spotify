import {IMAGE} from "./IMAGE_INTERFACE";

export interface ARTIST_INTERFACE  {
  id: string,
  name: string,
  followers?: number,
  genres?: string[],
  images?: IMAGE[],
}
