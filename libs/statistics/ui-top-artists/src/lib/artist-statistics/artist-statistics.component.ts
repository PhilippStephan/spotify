import {Component, inject, OnInit, signal} from '@angular/core';
import {ARTIST_INTERFACE} from "shared/domain";
import {RequestDataService, TIME_RANGE} from "auth/api-data-access";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatLine} from "@angular/material/core";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {TrackListComponent} from "shared/ui-track-list";
import {CardComponent} from "shared/ui-artist-card";
import {DisplayArtistsComponent} from "../display-artists/display-artists.component";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'top-artists-artist-statistics',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    MatLine,
    MatTab,
    MatTabGroup,
    TrackListComponent,
    CardComponent,
    DisplayArtistsComponent,
    MatButton
  ],
  templateUrl: './artist-statistics.component.html',
  styleUrl: './artist-statistics.component.scss'
})
export class ArtistStatisticsComponent implements OnInit{

  private requestService = inject(RequestDataService);

  selectedTabTitle  = signal('Last 30 days');
  shortTermArtists: ARTIST_INTERFACE[] = [];
  mediumTermArtists: ARTIST_INTERFACE[] = [];
  longTermArtists: ARTIST_INTERFACE[] = [];

  ngOnInit(): void {
    this.requestService.getTopArtists(50, TIME_RANGE.SHORT_TERM).then((tracks) => {
      this.shortTermArtists = tracks;
      return this.requestService.getTopArtists(50, TIME_RANGE.MEDIUM_TERM);
    }).then((tracks) => {
      this.mediumTermArtists = tracks;
      return this.requestService.getTopArtists(50, TIME_RANGE.LONG_TERM);
    }).then((tracks) => {
      this.longTermArtists = tracks;
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabTitle.set(event.tab.textLabel);
  }
  protected readonly TIME_RANGE = TIME_RANGE;
}
