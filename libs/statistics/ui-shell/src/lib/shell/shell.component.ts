import {Component, inject, OnInit, signal} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {TrackStatisticsComponent} from "statistics/ui-top-tracks";
import {MatChipListbox, MatChipOption} from "@angular/material/chips";
import {MatFormField, MatOption, MatSelect} from "@angular/material/select";
import {MatTabLabel} from "@angular/material/tabs";
import {SEARCH_OPTIONS} from "../../../../../search/ui-search/src/lib/search-tool-bar/SEARCH_OPTIONS";
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {MatLine} from "@angular/material/core";
import {BehaviorSubject, map, Observable} from "rxjs";
import {ARTIST_INTERFACE, TRACK_INTERFACE} from "shared/domain";
import {RequestDataService, TIME_RANGE} from "auth/api-data-access";
import {AsyncPipe} from "@angular/common";
import {ArtistStatisticsComponent} from "statistics/ui-top-artists";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'shell-shell',
  standalone: true,
  imports: [
    MatButton,
    TrackStatisticsComponent,
    MatChipListbox,
    MatChipOption,
    MatSelect,
    MatFormField,
    MatOption,
    MatTabLabel,
    MatButtonToggle,
    MatButtonToggleGroup,
    MatLine,
    AsyncPipe,
    ArtistStatisticsComponent
  ],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent implements OnInit{

  private requestService = inject(RequestDataService);
  private route = inject(ActivatedRoute);

  selectedType = '';
  selectedTimeRange = '';
  shortTermArtists: ARTIST_INTERFACE[] = [];
  mediumTermArtists: ARTIST_INTERFACE[] = [];
  longTermArtists: ARTIST_INTERFACE[] = [];
  shortTermTracks: TRACK_INTERFACE[] = [];
  mediumTermTracks: TRACK_INTERFACE[] = [];
  longTermTracks: TRACK_INTERFACE[] = [];
  topArtists$: BehaviorSubject<TRACK_INTERFACE[]> = new BehaviorSubject<TRACK_INTERFACE[]>([]);
  topTracks$: BehaviorSubject<TRACK_INTERFACE[]> = new BehaviorSubject<TRACK_INTERFACE[]>([]);

  async ngOnInit(): Promise<void> {
    this.requestService.getTopTracks(50, TIME_RANGE.SHORT_TERM).then((tracks) => this.shortTermTracks = tracks);
    this.requestService.getTopTracks(50, TIME_RANGE.MEDIUM_TERM).then((tracks) => this.mediumTermTracks = tracks);
    this.requestService.getTopTracks(50, TIME_RANGE.LONG_TERM).then((tracks) => this.longTermTracks = tracks);
    this.requestService.getTopArtists(50, TIME_RANGE.MEDIUM_TERM).then((artists) => this.shortTermArtists = artists);
    this.requestService.getTopArtists(50, TIME_RANGE.LONG_TERM).then((artists) => this.mediumTermArtists = artists);
    this.requestService.getTopArtists(50, TIME_RANGE.MEDIUM_TERM).then((artists) => this.longTermArtists = artists);
    const type = this.route.snapshot.paramMap.get('type');
    if(type){
      this.selectedType = type;
    }
    else {
      this.selectedType = 'tracks';
    }
    this.toggleResults(TIME_RANGE.SHORT_TERM);
  }

  toggleResults(timeRange: string){
    const type = this.route.snapshot.paramMap.get('type');
    if(type === 'artists'){
      switch (timeRange){
        case TIME_RANGE.MEDIUM_TERM: return this.mediumTermArtists;
        case TIME_RANGE.LONG_TERM: return this.longTermArtists;
        default: return this.shortTermArtists
      }
    }
    else{
      switch (timeRange){
        case TIME_RANGE.MEDIUM_TERM: return this.mediumTermTracks;
        case TIME_RANGE.LONG_TERM: return this.longTermTracks;
        default: return this.longTermTracks
      }
    }
  }

  protected readonly TIME_RANGE = TIME_RANGE;
}
