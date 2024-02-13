export interface IMAGE{
  url: string;
  height: number;
  width: number;
}
export interface USER_INTERFACE{
  displayName: string,
  followers: number,
  id: string,
  images: IMAGE[],
}
