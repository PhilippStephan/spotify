import {AfterContentInit, Component, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";
import {map, startWith} from "rxjs";

@Component({
  selector: 'search-search',
  standalone: true,
  imports: [CommonModule, MatAutocomplete, MatAutocompleteTrigger, MatButton, MatFormField, MatInput, MatOption, ReactiveFormsModule, MatIconButton, MatIcon, MatSuffix],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements AfterContentInit{
  @Input() artists!: string[] | null;
  @Output() newEvent = new EventEmitter<string>();
  @ViewChild('searchInput') searchInput!: ElementRef;

  fakeartist = [
    'kanye',
    'Carti',
  ]

  router = inject(Router);
  loading: boolean = false;
  emptyResult: boolean = false;

  clearInput($event: MouseEvent) {
    $event.preventDefault();
    this.searchInput.nativeElement.value = '';
    this.newEvent.emit('');
  }

  ngAfterContentInit(){
    this.router.events.subscribe(() => {
      this.newEvent.emit('');
      this.searchInput.nativeElement.value = '';
    })
  }

}
