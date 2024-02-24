import {Component, inject, Input} from '@angular/core';
import {ArtistsDisplayComponent} from "../artists-display/artists-display.component";
import {MatButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {ARTIST_INTERFACE} from "shared/domain";
import {MatDialog} from "@angular/material/dialog";
import {AllTopArtistsComponent} from "../all-top-artists/all-top-artists.component";

@Component({
  selector: 'profile-following-artists',
  standalone: true,
    imports: [
        ArtistsDisplayComponent,
        MatButton
    ],
  templateUrl: './following-artists.component.html',
  styleUrl: './following-artists.component.css'
})
export class FollowingArtistsComponent {

  @Input()
  artists$!: Observable<ARTIST_INTERFACE[] | null>;

  dialog = inject(MatDialog)

  openDialog(): void {
    this.dialog.open(AllTopArtistsComponent, {data: {
        artists: this.artists$,
        header: "Following"
      }});
  }


}
