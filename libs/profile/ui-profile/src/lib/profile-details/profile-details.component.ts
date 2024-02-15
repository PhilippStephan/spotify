import {Component, inject, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileOverviewComponent} from "../profile-overview/profile-overview.component";
import {FollowingComponent} from "../following/following.component";
import {TopArtistsComponent} from "../top-artists/top-artists.component";
import {TopAlbumsComponent} from "../top-albums/top-albums.component";
import {TopTracksComponent} from "../top-tracks/top-tracks.component";
import {USER_INTERFACE} from "shared/domain";
import {RequestDataService} from "auth/api-data-access";
import {BehaviorSubject} from "rxjs";
import {MatDivider} from "@angular/material/divider";

@Component({
  selector: 'profile-profile-details',
  standalone: true,
  imports: [CommonModule, ProfileOverviewComponent, FollowingComponent, TopArtistsComponent, TopAlbumsComponent, TopTracksComponent, MatDivider],
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css',
})

@Injectable({providedIn: 'root'})
export class ProfileDetailsComponent implements OnInit{

  requestService = inject(RequestDataService)
  user$: BehaviorSubject<USER_INTERFACE | null> = new BehaviorSubject<USER_INTERFACE | null>(null)

  async ngOnInit(): Promise<void> {
    const user = await this.requestService.fetchProfile();
    console.log(user)
    this.user$.next(user)
  }
}
