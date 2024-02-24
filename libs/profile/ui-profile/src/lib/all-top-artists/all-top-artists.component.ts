import {Component, Inject, inject} from '@angular/core';
import {CardComponent} from "shared/ui-artist-card";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {DialogRef} from "@angular/cdk/dialog";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ARTIST_INTERFACE} from "shared/domain";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

export interface DialogData {
  artists: Observable<ARTIST_INTERFACE[] |null>;
  header: string
}
@Component({
  selector: 'profile-all-top-artists',
  standalone: true,
  imports: [
    CardComponent,
    MatButton,
    MatIcon,
    MatIconButton,
    AsyncPipe
  ],
  templateUrl: './all-top-artists.component.html',
  styleUrl: './all-top-artists.component.css'
})
export class AllTopArtistsComponent {

  dialogRef = inject(DialogRef);

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}
