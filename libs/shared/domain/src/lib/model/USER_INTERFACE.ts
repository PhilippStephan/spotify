import {IMAGE} from "./IMAGE_INTERFACE";

export interface USER_INTERFACE{
  displayName: string,
  followers: number,
  id: string,
  images: IMAGE[],
}
