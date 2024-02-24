import {Component, Input} from '@angular/core';
import {ARTIST_INTERFACE} from "shared/domain";
import {CardComponent} from "shared/ui-artist-card";

@Component({
  selector: 'search-artist-results',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './artist-results.component.html',
  styleUrl: './artist-results.component.css'
})
export class ArtistResultsComponent {

  @Input()
  artists!: ARTIST_INTERFACE[] | null;
}
