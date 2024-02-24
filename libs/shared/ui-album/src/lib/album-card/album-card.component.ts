import {Component, Input} from '@angular/core';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {ProfilePicComponent} from "shared/ui-profile-picture";
import {ALBUM_INTERFACE, ARTIST_INTERFACE} from "shared/domain";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'album-album-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatIcon,
    ProfilePicComponent,
    MatCardFooter,
    MatTooltip
  ],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.css'
})
export class AlbumCardComponent {

  @Input()
  album: ALBUM_INTERFACE | undefined = undefined;
}
