import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'profile-picture-profile-pic',
  standalone: true,
  imports: [CommonModule, MatIcon],
  templateUrl: './profile-pic.component.html',
  styleUrl: './profile-pic.component.css',
})
export class ProfilePicComponent {

  @Input()
  imageSrc: string | undefined | null = null;

  @Input()
  imageSize: number = 44;

  @Input()
  showPointer: boolean = false;

  isSquare: boolean = false;
  isPortrait: boolean = false;
  isLandscape: boolean = false;

  onImageLoad(event: Event) {
    const imgElement = event.target as HTMLImageElement;
    const width = imgElement.naturalWidth;
    const height = imgElement.naturalHeight;
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

  private rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
}
