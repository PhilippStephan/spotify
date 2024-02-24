import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  HostListener, inject, Injectable,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {CardComponent} from "shared/ui-artist-card";
import {ARTIST_INTERFACE} from "shared/domain";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {LogoutDialogComponent} from "profile/ui-logout";
import {MatDialog} from "@angular/material/dialog";
import {AllTopArtistsComponent} from "../all-top-artists/all-top-artists.component";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {RequestDataService} from "auth/api-data-access";
import {ArtistsDisplayComponent} from "../artists-display/artists-display.component";

@Component({
  selector: 'profile-top-artists',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    AsyncPipe,
    ArtistsDisplayComponent
  ],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class TopArtistsComponent{

  @Input()
  artists$!: Observable<ARTIST_INTERFACE[] | null>;

  dialog = inject(MatDialog)

  openDialog(): void {
    this.dialog.open(AllTopArtistsComponent, {data: {
      artists: this.artists$,
        header: "Top artists last 30 days"
      }});
  }

}
