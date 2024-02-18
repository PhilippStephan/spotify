import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCard, MatCardContent, MatCardFooter, MatCardHeader} from "@angular/material/card";
import {ARTIST_INTERFACE} from "shared/domain";
import {ProfilePicComponent} from "shared/ui-profile-picture";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'artist-card-card',
  standalone: true,
  imports: [CommonModule, MatCardHeader, MatCard, MatCardFooter, MatCardContent, ProfilePicComponent, MatButton],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

  @Input()
  artist: ARTIST_INTERFACE | undefined = undefined;


}
