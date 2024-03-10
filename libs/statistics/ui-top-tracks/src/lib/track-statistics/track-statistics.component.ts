import {Component, computed, inject, Input, signal} from '@angular/core';
import {ARTIST_INTERFACE, TRACK_INTERFACE} from "shared/domain";
import {RequestDataService, TIME_RANGE} from "auth/api-data-access";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatLine} from "@angular/material/core";
import {ActivatedRoute, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import {MatTab, MatTabChangeEvent, MatTabGroup} from "@angular/material/tabs";
import {TrackListComponent} from "shared/ui-track-list";

@Component({
  selector: 'top-tracks-track-statistics',
  standalone: true,
  imports: [
    MatButtonToggle,
    MatButtonToggleGroup,
    MatLine,
    MatTabGroup,
    MatTab,
    TrackListComponent
  ],
  templateUrl: './track-statistics.component.html',
  styleUrl: './track-statistics.component.scss'
})
export class TrackStatisticsComponent {

  private requestService = inject(RequestDataService);

  selectedTabTitle  = signal('Last 30 days');

  shortTermTracks: TRACK_INTERFACE[] = [];
  mediumTermTracks: TRACK_INTERFACE[] = [];
  longTermTracks: TRACK_INTERFACE[] = [];

  ngOnInit(): void {
    this.requestService.getTopTracks(50, TIME_RANGE.SHORT_TERM).then((tracks) => {
      this.shortTermTracks = tracks;
      return this.requestService.getTopTracks(50, TIME_RANGE.MEDIUM_TERM);
    }).then((tracks) => {
      this.mediumTermTracks = tracks;
      return this.requestService.getTopTracks(50, TIME_RANGE.LONG_TERM);
    }).then((tracks) => {
      this.longTermTracks = tracks;
    });
  }

  onTabChange(event: MatTabChangeEvent): void {
    this.selectedTabTitle.set(event.tab.textLabel);
  }

  protected readonly TIME_RANGE = TIME_RANGE;
}
