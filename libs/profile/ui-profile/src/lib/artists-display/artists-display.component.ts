import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {CardComponent} from "shared/ui-artist-card";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Observable} from "rxjs";
import {ARTIST_INTERFACE} from "shared/domain";
import {MatDialog} from "@angular/material/dialog";
import {AllTopArtistsComponent} from "../all-top-artists/all-top-artists.component";

@Component({
  selector: 'profile-artists-display',
  standalone: true,
    imports: [
        AsyncPipe,
        CardComponent,
        MatIcon,
        MatIconButton
    ],
  templateUrl: './artists-display.component.html',
  styleUrl: './artists-display.component.css'
})
export class ArtistsDisplayComponent implements OnInit, AfterViewInit{

  @Input() artists!: Observable<ARTIST_INTERFACE[] | null>;
  @ViewChild('leftbutton') leftButton!: ElementRef;
  @ViewChild('rightbutton') rightButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  dialog = inject(MatDialog);

  leftIsDisabled: boolean = true;
  rightIsDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.artists?.subscribe(() => {
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
}
