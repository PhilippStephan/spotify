import {inject, Injectable} from '@angular/core';
import {AuthService} from "auth/api-data-access";
import {USER_INTERFACE} from "shared/domain";

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  authService = inject(AuthService);
  API_BASE_URL: string = 'https://api.spotify.com/v1';

  async fetchProfile() {
    if (this.authService.checkTokens()) {
      const result = await fetch(`${this.API_BASE_URL}/me`, {
        method: "GET", headers: {Authorization: `Bearer ${window.localStorage.getItem('access_token')}`}
      });
      const {display_name, id, images, followers} = await result.json();
      window.localStorage['display_name'] = display_name;
      window.localStorage['id'] = id;
      window.localStorage['image'] = images[0].url;
      console.log(images)
      console.log(window.localStorage.getItem('image'));
      const user: USER_INTERFACE = {
        displayName: display_name,
        followers: followers['total'],
        id: id,
        images: images
      }
      console.log(user)
      return user;
    }
    return null;
  }

  async searchArtist(input: string) {
    if (input) {
      if (this.authService.checkTokens()) {
        const result = await fetch(`${this.API_BASE_URL}/search?type=artist&q=${input}`, {
          method: "GET", headers: {Authorization: `Bearer ${window.localStorage.getItem('access_token')}`}
        });
        const {artists} = await result.json();
        let artistsNames: string[] = [];
        artists.items.forEach((artist: any, id: number) => {
          if (id < 10) {
            artistsNames.push(artist.name);
            id++;
          }
          return artistsNames;
        });
        return artistsNames;
      }
      return [];
    }
    return [];
  }
}
