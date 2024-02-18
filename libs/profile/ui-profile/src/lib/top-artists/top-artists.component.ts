import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener, inject, Injectable,
  Input,
  OnInit,
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

@Component({
  selector: 'profile-top-artists',
  standalone: true,
  imports: [
    CardComponent,
    MatIcon,
    MatIconButton,
    MatButton,
    AsyncPipe
  ],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})

@Injectable({
  providedIn: 'root'
})
export class TopArtistsComponent implements OnInit, AfterViewInit {

  @Input() artists!: Observable<ARTIST_INTERFACE[] | null>;
  @ViewChild('leftbutton') leftButton!: ElementRef;
  @ViewChild('rightbutton') rightButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  dialog = inject(MatDialog);

  leftIsDisabled: boolean = true;
  rightIsDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.artists.subscribe(() => {
      setTimeout(() => {
      this.updateDisabled();
    }, 300);
    });

  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateDisabled(); // Überprüfen Sie den Status der Buttons nach dem Ändern der Fenstergröße
  }

  scrollLeft() {
    this.container.nativeElement.scrollLeft -= 190; // Scrollen nach links
    this.updateDisabled();
  }

  scrollRight() {
    this.container.nativeElement.scrollLeft += 190; // Scrollen nach rechts
    this.updateDisabled();
  }

  updateDisabled() {
    this.leftIsDisabled = this.container.nativeElement.scrollLeft === 0;
    this.rightIsDisabled =
      this.container.nativeElement.scrollLeft +
      this.container.nativeElement.offsetWidth >=
      this.container.nativeElement.scrollWidth;
  }

  openDialog(): void {
    this.dialog.open(AllTopArtistsComponent, {data: {
      artists: this.artists
      }});
  }
}
