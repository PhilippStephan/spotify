import {Component, inject, Input} from '@angular/core';
import {TRACK_INTERFACE} from "shared/domain";
import {of} from "rxjs";
import {TrackListComponent} from "shared/ui-track-list";
import {MatButton} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {AllTopArtistsComponent} from "../all-top-artists/all-top-artists.component";
import {AllTopTracksComponent} from "../all-top-tracks/all-top-tracks.component";

@Component({
  selector: 'profile-top-tracks',
  standalone: true,
  imports: [
    TrackListComponent,
    MatButton
  ],
  templateUrl: './top-tracks.component.html',
  styleUrl: './top-tracks.component.css'
})
export class TopTracksComponent {

  @Input()
  topTracks!: TRACK_INTERFACE[] | null;

  dialog = inject(MatDialog)

  openDialog(): void {
    this.dialog.open(AllTopTracksComponent, {data: {
        tracks: this.topTracks,
        header: "Top tracks last 30 days"
      }});
  }

}
