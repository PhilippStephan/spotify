import {Component, Input} from '@angular/core';
import {CardComponent} from "shared/ui-artist-card";
import {ARTIST_INTERFACE} from "shared/domain";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'top-artists-display-artists',
  standalone: true,
  imports: [
    CardComponent,
    AsyncPipe
  ],
  templateUrl: './display-artists.component.html',
  styleUrl: './display-artists.component.scss'
})
export class DisplayArtistsComponent {

  @Input()
  artists!: ARTIST_INTERFACE[] | null;
}
