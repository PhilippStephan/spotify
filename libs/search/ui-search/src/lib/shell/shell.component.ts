import {Component, inject, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService, RequestDataService} from "auth/api-data-access";
import {ARTIST_INTERFACE, TRACK_INTERFACE, USER_INTERFACE} from "shared/domain";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute} from "@angular/router";
import {BehaviorSubject, debounceTime, map, Observable, of, startWith, switchMap} from "rxjs";
import {forEach} from "@angular-devkit/schematics";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {SearchComponent} from "../search/search.component";
import {MatList, MatListItem} from "@angular/material/list";
import {SearchToolBarComponent} from "../search-tool-bar/search-tool-bar.component";
import {ArtistResultsComponent} from "../artist-results/artist-results.component";
import {AlbumResultsComponent} from "../album-results/album-results.component";
import {TrackResultsComponent} from "../track-results/track-results.component";
import {PlaylistResultsComponent} from "../playlist-results/playlist-results.component";
import {SEARCH_OPTIONS} from "../search-tool-bar/SEARCH_OPTIONS";
import {MatSidenavContent} from "@angular/material/sidenav";
import {ALBUM_INTERFACE} from "../../../../../shared/domain/src/lib/model/ALBUM_INTERFACE";

@Component({
  selector: 'search-shell',
  standalone: true,
  imports: [CommonModule, MatFormField, MatButton, MatInput, MatAutocomplete, MatOption, MatAutocompleteTrigger, ReactiveFormsModule, SearchComponent, MatList, MatListItem, SearchToolBarComponent, ArtistResultsComponent, AlbumResultsComponent, TrackResultsComponent, PlaylistResultsComponent, MatSidenavContent],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})

@Injectable({providedIn: 'root'})
export class ShellComponent{

  protected readonly SEARCH_OPTIONS = SEARCH_OPTIONS;
  protected readonly window = window.localStorage;
  requestDataService = inject(RequestDataService);

  selectedResult: string = 'all';
  showingAll: boolean = true;

  filterSearch$ = new BehaviorSubject('');
  resultArtists$: Observable<ARTIST_INTERFACE[] | null> = this.filterSearch$.pipe(
    debounceTime(300),
    switchMap((filterString) =>  this.requestDataService.searchArtists(filterString)
    )
  );
  resultAlbums$: Observable<ALBUM_INTERFACE[] | null> = this.filterSearch$.pipe(
    debounceTime(300),
    switchMap((filterString) =>  this.requestDataService.searchAlbums(filterString)
    )
  );
  resultTracks$: Observable<TRACK_INTERFACE[] | null> = this.filterSearch$.pipe(
    debounceTime(300),
    switchMap((filterString) =>  this.requestDataService.searchTracks(filterString)
    )
  )

  showResults(resultType: string): void {
    if(resultType === 'all'){
      this.selectedResult = 'all';
      this.showingAll = true;
    }
    else {
      this.selectedResult = resultType;
      this.showingAll = false;
    }
  }
}
