import {Component, Inject, inject, Input} from '@angular/core';
import {TRACK_INTERFACE} from "shared/domain";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {AsyncPipe} from "@angular/common";
import {CardComponent} from "shared/ui-artist-card";
import {MatButton} from "@angular/material/button";
import {TrackListComponent} from "shared/ui-track-list";

export interface DialogData {
  tracks: TRACK_INTERFACE[];
  header: string
}

@Component({
  selector: 'profile-all-top-tracks',
  standalone: true,
  imports: [
    AsyncPipe,
    CardComponent,
    MatButton,
    TrackListComponent
  ],
  templateUrl: './all-top-tracks.component.html',
  styleUrl: './all-top-tracks.component.css'
})
export class AllTopTracksComponent {

  dialogRef = inject(DialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
    console.log(data.tracks + "test")
  }

}
