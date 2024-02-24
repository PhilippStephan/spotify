import {inject, Injectable} from '@angular/core';
import {AuthService} from "auth/api-data-access";
import {ARTIST_INTERFACE, TRACK_INTERFACE, USER_INTERFACE} from "shared/domain";
import {HttpClient} from "@angular/common/http";
import {AlbumMapperService, ArtistMapperService, TrackMapperService} from "shared/util-mapper";
import {EMPTY} from "rxjs";
import {ALBUM_INTERFACE} from "../../../../../shared/domain/src/lib/model/ALBUM_INTERFACE";

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

  async getTopArtists(): Promise<ARTIST_INTERFACE[]> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/me/top/artists?time_range=short_term`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('access_token')}`
        }
      });
      if (!result.ok) {
        console.log('Fehler beim Abrufen der Daten');
      }
      const following = await this.getFollowing();
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

  async getTopTracks(): Promise<TRACK_INTERFACE[] | null> {
    if (!this.authService.checkTokens()) {
      return [];
    }
    try {
      const result = await fetch(`${this.API_BASE_URL}/me/top/tracks?time_range=short_term&limit=50`, {
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
}
