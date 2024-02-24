import {Component, inject, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileOverviewComponent} from "../profile-overview/profile-overview.component";
import {TopArtistsComponent} from "../top-artists/top-artists.component";
import {TopTracksComponent} from "../top-tracks/top-tracks.component";
import {ARTIST_INTERFACE, TRACK_INTERFACE, USER_INTERFACE} from "shared/domain";
import {RequestDataService} from "auth/api-data-access";
import {BehaviorSubject} from "rxjs";
import {MatDivider} from "@angular/material/divider";
import {MatCard, MatCardContent} from "@angular/material/card";
import {FollowingArtistsComponent} from "../following-artists/following-artists.component";

@Component({
  selector: 'profile-profile-details',
  standalone: true,
  imports: [CommonModule, ProfileOverviewComponent, TopArtistsComponent, TopTracksComponent, MatDivider, MatCard, MatCardContent, FollowingArtistsComponent],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css',
})

@Injectable({providedIn: 'root'})
export class ProfileDetailsComponent implements OnInit{

  topArtists = inject(TopArtistsComponent);

  requestService = inject(RequestDataService);
  user$: BehaviorSubject<USER_INTERFACE | null> = new BehaviorSubject<USER_INTERFACE | null>(null);
  topArtists$: BehaviorSubject<ARTIST_INTERFACE[]> = new BehaviorSubject<ARTIST_INTERFACE[]>([]);
  topTracks$: BehaviorSubject<TRACK_INTERFACE[]> = new BehaviorSubject<TRACK_INTERFACE[]>([]);
  followingArtists$: BehaviorSubject<ARTIST_INTERFACE[]> = new BehaviorSubject<ARTIST_INTERFACE[]>([]);


  async ngOnInit(): Promise<void> {
    const user = await this.requestService.fetchProfile();
    this.user$.next(user)
    const followingArtists = await this.requestService.getFollowing();
    console.log(followingArtists)
    this.followingArtists$.next(followingArtists);
    const topArtists = await this.requestService.getTopArtists();
    this.topArtists$.next(topArtists);
    const topTracks = await this.requestService.getTopTracks();
    console.log(topTracks);
    this.topTracks$.next(topTracks!);
  }
}
