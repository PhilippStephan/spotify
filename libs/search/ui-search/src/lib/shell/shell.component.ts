import {Component, inject, Injectable, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService, RequestDataService} from "auth/api-data-access";
import {USER_INTERFACE} from "shared/domain";
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

@Component({
  selector: 'search-shell',
  standalone: true,
  imports: [CommonModule, MatFormField, MatButton, MatInput, MatAutocomplete, MatOption, MatAutocompleteTrigger, ReactiveFormsModule, SearchComponent, MatList, MatListItem],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})

@Injectable({providedIn: 'root'})
export class ShellComponent{

  protected readonly window = window.localStorage;
  requestDataService = inject(RequestDataService);


  filterSearch$ = new BehaviorSubject('');
  resultArtists$ = this.filterSearch$.pipe(
    debounceTime(200),
    switchMap((filterString) => this.searchArtist(filterString))
  )

  async searchArtist(input: string): Promise<string[]> {
      return await this.requestDataService.searchArtist(input);
  }
}
