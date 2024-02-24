import {Component, Input} from '@angular/core';
import {ALBUM_INTERFACE} from "../../../../../shared/domain/src/lib/model/ALBUM_INTERFACE";
import {TRACK_INTERFACE} from "shared/domain";
import {CardComponent} from "shared/ui-artist-card";
import {TrackListComponent} from "shared/ui-track-list";

@Component({
  selector: 'search-track-results',
  standalone: true,
  imports: [
    CardComponent,
    TrackListComponent
  ],
  templateUrl: './track-results.component.html',
  styleUrl: './track-results.component.css'
})
export class TrackResultsComponent {

  @Input()
  tracks!: TRACK_INTERFACE[] | null;
}
