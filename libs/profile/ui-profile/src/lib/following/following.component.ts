import { Component, ElementRef, HostListener, Input, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ARTIST_INTERFACE } from 'shared/domain';
import { CardComponent } from 'shared/ui-artist-card';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';

@Component({
  selector: 'profile-following',
  standalone: true,
  imports: [CardComponent, MatIcon, MatIconButton],
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css'],
})
export class FollowingComponent implements OnInit, AfterViewInit {

  @Input() artists!: ARTIST_INTERFACE[] | null;
  @ViewChild('leftbutton') leftButton!: ElementRef;
  @ViewChild('rightbutton') rightButton!: ElementRef;
  @ViewChild('container') container!: ElementRef;

  leftIsDisabled: boolean = true;
  rightIsDisabled: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateDisabled(); // Überprüfen Sie den Status der Buttons nach dem Initialisieren der Komponente
  }

  ngAfterViewInit() {
    this.cdr.detectChanges(); // Manuelle Auslösung der Change Detection
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
