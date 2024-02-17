import { Component } from '@angular/core';
import {CardComponent} from "shared/ui-artist-card";
import {ARTIST_INTERFACE} from "shared/domain";

@Component({
  selector: 'profile-top-artists',
  standalone: true,
  imports: [
    CardComponent
  ],
  templateUrl: './top-artists.component.html',
  styleUrl: './top-artists.component.css'
})
export class TopArtistsComponent {

  artist: ARTIST_INTERFACE = {
    id: 'ssda',
    name: 'Ken Carson',
    images: [
      {
        height: 160,
        url: 'https://i.scdn.co/image/ab6761610000f17895ccca370d8bd50e84c222bc',
        width: 160,
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/ab6761610000f17895ccca370d8bd50e84c222bc',
        width: 160,
      },
      {
        height: 160,
        url: 'https://i.scdn.co/image/ab6761610000f17895ccca370d8bd50e84c222bc',
        width: 160,
      },
    ]
  }
}
