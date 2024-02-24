import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'play-button-play-button',
  standalone: true,
  imports: [
    MatIcon
  ],
  templateUrl: './play-button.component.html',
  styleUrl: './play-button.component.css'
})
export class PlayButtonComponent {

  @Input()
  isPlaying: boolean = false;

}
