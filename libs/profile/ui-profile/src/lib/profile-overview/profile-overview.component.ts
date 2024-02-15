import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {USER_INTERFACE} from "shared/domain";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'profile-profile-overview',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css'
})
export class ProfileOverviewComponent {

  @Input() user!: USER_INTERFACE | null;

  isSquare: boolean = false;
  isPortrait: boolean = false;
  isLandscape: boolean = false;

  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const width = imgElement.naturalWidth;
    const height = imgElement.naturalHeight;
    console.log('Width:', width);
    console.log('Height:', height);
    if(width === height){
      this.isSquare = true;
    }
    else if(width > height){
      this.isLandscape = true;
    }
    else {
      this.isPortrait = true;
    }
  }
}
