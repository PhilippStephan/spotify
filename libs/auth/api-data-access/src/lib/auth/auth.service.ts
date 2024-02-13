
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, of} from "rxjs";
import {inject, Injectable} from "@angular/core";
import {TOKEN_INTERFACE} from "shared/domain";
import {USER_INTERFACE} from "shared/domain";
import {toSignal} from "@angular/core/rxjs-interop";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

  CLIENT_ID: string='b2afd44f785f4e0f95a7e939348215da';
  CLIENT_SECRET: string = '5c7d5657c4a74045a02b4f4ed4bb04ca';
  RESPONSE_TYPE ="code"
  REDIRECT_URI = 'http://localhost:4200/callback'
  AUTH_URL: string = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}&response_type=${this.RESPONSE_TYPE}`;
  TOKEN_URL: string = 'https://accounts.spotify.com/api/token';
  API_BASE_URL: string = 'https://api.spotify.com/v1';

  http = inject(HttpClient);
  router= inject(Router);
  requestAuth(){
    window.open(this.AUTH_URL, "_self");
  }

  async requestToken(token: string) {
    console.log(token);
    const params = new URLSearchParams();
    params.append("client_id", this.CLIENT_ID);
    params.append('client_secret', this.CLIENT_SECRET);
    params.append("grant_type", "authorization_code");
    params.append("code", token);
    params.append("redirect_uri", this.REDIRECT_URI);
    const result = await fetch(this.TOKEN_URL, {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: params
    });
    const { access_token, expires_in, refresh_token } = await result.json();
    console.log(access_token);
    console.log(refresh_token);
    sessionStorage['access_token'] = access_token;
    sessionStorage['refresh_token'] = refresh_token;
    sessionStorage['expires_at'] = Date.now() + 10 * 1000;
    console.log(sessionStorage.getItem('expires_at'))
  }

  checkTokens(){
    const access_token = sessionStorage.getItem('access_token');
    const expires_at = sessionStorage.getItem('expires_at') as unknown as number;
    if(!access_token){
      this.router.navigate(['/login']);
      return false;
    }
    if(Date.now() > expires_at){
      return this.refreshToken();
    }
    return true;
  }

  async refreshToken() {
    const refresh_token = sessionStorage.getItem('refresh_token');
    if (refresh_token) {
      const params = new URLSearchParams();
      params.append("client_id", this.CLIENT_ID);
      params.append('client_secret', this.CLIENT_SECRET);
      params.append("grant_type", "refresh_token");
      params.append("refresh_token", refresh_token);
      const result = await fetch(this.TOKEN_URL, {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
      });
      const {access_token, refreshed_token} = await result.json();
      if(access_token && refreshed_token){
        sessionStorage['access_token'] = access_token;
        sessionStorage['refresh_token'] = refreshed_token;
        return true;
      }
      return false;
    }
    else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  removeSession(){
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  async fetchProfile(){
    if(this.checkTokens()){
      const result = await fetch(`${this.API_BASE_URL}/me`, {
        method: "GET", headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
      });
      const { display_name, id, images } = await result.json();
      sessionStorage['display_name'] = display_name;
      sessionStorage['id'] = id;
      sessionStorage['image'] = images[0].url;
      console.log(images)
      console.log(sessionStorage.getItem('image'));
      /*const user: USER_INTERFACE = {
        displayName: display_name,
        followers: followers['total'],
        id: id,
        images: images
      }
      console.log(user)
      return user;*/
    }
    return null;
  }

  async searchArtist(input: string) {
    if(input){
      if(this.checkTokens()){
        const result = await fetch(`${this.API_BASE_URL}/search?type=artist&q=${input}`, {
          method: "GET", headers: { Authorization: `Bearer ${sessionStorage.getItem('access_token')}` }
        });
        const {artists} = await result.json();
        return artists.items[0].name as string;
      }
    }
    return '';
  }
}
