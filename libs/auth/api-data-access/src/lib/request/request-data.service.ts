import {inject, Injectable} from '@angular/core';
import {AuthService} from "auth/api-data-access";
import {ALBUM_INTERFACE, ARTIST_INTERFACE, TRACK_INTERFACE, USER_INTERFACE} from "shared/domain";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AlbumMapperService, ArtistMapperService, TrackMapperService} from "shared/util-mapper";
import {catchError, throwError} from "rxjs";

export const TIME_RANGE =  {
  SHORT_TERM: "short_term",
  MEDIUM_TERM: "medium_term",
  LONG_TERM: "long_term",
}

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  http = inject(HttpClient)
  artistMapper = inject(ArtistMapperService);
  albumMapper = inject(AlbumMapperService);
  trackMapper = inject(TrackMapperService);

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

  async searchArtists(input: string): Promise<ARTIST_INTERFACE[] | null> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    if(!input){
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/search?type=artist&q=${input}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const artists = data?.artists?.items || [];
      const resultArtists: ARTIST_INTERFACE[] | null = [];
      if(artists){
        artists.forEach((artist: any) => resultArtists.push(this.artistMapper.mapToArtist(artist)));
      }
      return resultArtists;
    } catch (error) {
      return [];
    }
  }

  async searchAlbums(input: string) {
    if (!this.authService.checkTokens()){
      return [];
    }
    if(!input){
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/search?type=album&q=${input}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const albums = data?.albums?.items || [];
      const resultAlbums: ALBUM_INTERFACE[] | null = [];
      if(albums){
        albums.forEach((album: any) => resultAlbums.push(this.albumMapper.mapToAlbum(album)));
      }
      console.log(resultAlbums)
      return resultAlbums;
    } catch (error) {
      return [];
    }
  }

  async searchTracks(input: string) {
    if (!this.authService.checkTokens()){
      return [];
    }
    if(!input){
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/search?type=track&q=${input}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const tracks = data?.tracks?.items || [];
      const resultTracks: TRACK_INTERFACE[] | null = [];
      if(tracks){
        tracks.forEach((track: any) => resultTracks.push(this.trackMapper.mapToTrack(track)));
      }
      return resultTracks;
    } catch (error) {
      return [];
    }
  }

  async searchPlaylists(input: string) {
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

  async getFollowing(): Promise<ARTIST_INTERFACE[]> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/me/following?type=artist`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const artists = data?.artists?.items || [];
      const resultArtists: ARTIST_INTERFACE[] | null = [];
      if(artists){
        artists.forEach((artist: any) => resultArtists.push(this.artistMapper.mapToArtist(artist)));
      }
      return resultArtists;
    } catch (error) {
      return [];
    }
  }

  async getTopArtists(limit: number, range: string): Promise<ARTIST_INTERFACE[]> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/me/top/artists?limit=${limit}&time_range=${range}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const artists = data?.items || [];
      const resultArtists: ARTIST_INTERFACE[] | null = [];
      if(artists){
        artists.forEach((artist: any) => resultArtists.push(this.artistMapper.mapToArtist(artist)));
      }
      return resultArtists;
    } catch (error) {
      return [];
    }
  }

  async getTopTracks(limit: number, range: string): Promise<TRACK_INTERFACE[]> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/me/top/tracks?limit=${limit}&time_range=${range}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const data = await result.json();
      const tracks: any[] = data?.items || [];
      const resultTracks: TRACK_INTERFACE[] | null = [];
      if(tracks){
        tracks.forEach((track: any) => resultTracks.push(this.trackMapper.mapToTrack(track)));
      }
      return resultTracks;
    } catch (error) {
      return [];
    }
  }

  async followArtists(id:string): Promise<void>{
    if (this.authService.checkTokens()) {
      try {
        const result = await fetch(`${this.API_BASE_URL}/me/following?type=artist&ids=${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('access_token')}`,
          }
        });
        if (!result.ok) {
          console.log('Fehler beim Abrufen der Daten');
        }
        console.log(this.getFollowing());
      } catch (error) {
        console.log(error)
      }
    }
  }

   createPlaylist(title: string, description: string, isPublic: boolean, tracks?: string[]){
    if(this.authService.checkTokens()){
      if(title){
        console.log()
        const url = `https://api.spotify.com/v1/users/${window.localStorage.getItem('id')}/playlists`;
        const body = {
          name: title,
          description: description,
          public: isPublic
        };

        const headers = new HttpHeaders({
          'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        });
        let playlistId = ""
        const data = this.http.post(url, body, { headers: headers }).pipe(
          catchError(error => {
            console.error("Error:", error);
            return throwError(error);
          })
        )
          .subscribe((response: any) => {
            console.log("Response:", response);
            playlistId = response.id;
            if (tracks){
              this.addTracksToPlaylist(playlistId, tracks);
            }
          });
      }
    }
  }

   addTracksToPlaylist(playlistId: string, tracks: string[], position?: number){
    if(this.authService.checkTokens()){
      if(tracks){
        const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
        const body = {
          uris: tracks,
          position: position ?? 0
        };
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${window.localStorage.getItem('access_token')}`,
          'Content-Type': 'application/json'
        });
        this.http.post(url, body, { headers: headers }).pipe(
          catchError(error => {
            console.error("Error:", error);
            return throwError(error);
          })
        )
          .subscribe();
      }
    }
  }
}
