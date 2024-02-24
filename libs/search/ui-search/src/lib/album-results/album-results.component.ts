import {Component, Input} from '@angular/core';
import {CardComponent} from "shared/ui-artist-card";
import {ALBUM_INTERFACE} from "../../../../../shared/domain/src/lib/model/ALBUM_INTERFACE";
import {AlbumCardComponent} from "shared/ui-album";

@Component({
  selector: 'search-album-results',
  standalone: true,
  imports: [
    CardComponent,
    AlbumCardComponent
  ],
  templateUrl: './album-results.component.html',
  styleUrl: './album-results.component.css'
})
export class AlbumResultsComponent {

  @Input()
  albums!: ALBUM_INTERFACE[] | null;

}
