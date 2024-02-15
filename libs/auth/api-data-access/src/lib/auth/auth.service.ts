import {HttpClient} from "@angular/common/http";
import {inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {

  CLIENT_ID: string = 'b2afd44f785f4e0f95a7e939348215da';
  CLIENT_SECRET: string = '5c7d5657c4a74045a02b4f4ed4bb04ca';
  RESPONSE_TYPE = "code"
  REDIRECT_URI = 'http://localhost:4200/callback'
  AUTH_URL: string = `https://accounts.spotify.com/authorize`;
  TOKEN_URL: string = 'https://accounts.spotify.com/api/token';
  SCOPE = 'user-read-recently-played user-top-read user-read-playback-position user-read-playback-state user-modify-playback-state user-read-currently-playing streaming playlist-modify-public playlist-modify-private playlist-read-private playlist-read-collaborative user-library-modify user-library-read user-read-email user-read-private user-follow-read user-top-read'
  http = inject(HttpClient);
  router = inject(Router);

  requestAuth() {
    const params = new URLSearchParams({
      client_id: this.CLIENT_ID,
      redirect_uri: this.REDIRECT_URI,
      scope: this.SCOPE,
      response_type: this.RESPONSE_TYPE,
    });
    window.location.href = `${this.AUTH_URL}?${params.toString()}`;
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
    const {access_token, expires_in, refresh_token} = await result.json();
    console.log(access_token);
    console.log(refresh_token);
    window.localStorage['access_token'] = access_token;
    window.localStorage['refresh_token'] = refresh_token;
    window.localStorage['expires_at'] = Date.now() + expires_in * 1000;
    console.log(window.localStorage.getItem('expires_at'))
  }

  checkTokens() {
    const access_token = window.localStorage.getItem('access_token');
    console.log(access_token)
    const expires_at = window.localStorage.getItem('expires_at') as unknown as number;
    if (!access_token) {
      this.router.navigate(['/login']);
      return false;
    }
    if (Date.now() > expires_at) {
      return this.refreshToken();
    }
    return true;
  }

  async refreshToken() {
    const refresh_token = window.localStorage.getItem('refresh_token');
    console.log(refresh_token);
    if (refresh_token) {
      const payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refresh_token,
          client_id: this.CLIENT_ID,
          client_secret: this.CLIENT_SECRET
        }),
      }
      console.log("about to refresh")
      const result = await fetch(this.TOKEN_URL, payload);
      const {access_token, expires_in} = await result.json();
      if(access_token && expires_in){
        window.localStorage['access_token'] = access_token;
        window.localStorage['expires_at'] = Date.now() + expires_in * 1000;
        console.log("refreshed")
        return true;
      }
      return false;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

  removeSession() {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

}
