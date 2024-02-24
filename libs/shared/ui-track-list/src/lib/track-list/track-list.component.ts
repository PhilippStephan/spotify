import {Component, Input} from '@angular/core';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {ARTIST_INTERFACE, TRACK_INTERFACE} from "shared/domain";
import {MatIcon} from "@angular/material/icon";
import {MatDivider} from "@angular/material/divider";
import {PlayButtonComponent} from "shared/ui-play-button";

@Component({
  selector: 'track-list-track-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    MatHeaderCellDef,
    MatCellDef,
    MatIcon,
    MatDivider,
    PlayButtonComponent
  ],
  templateUrl: './track-list.component.html',
  styleUrl: './track-list.component.css'
})
export class TrackListComponent {

  @Input()
  tracks!: TRACK_INTERFACE[] | null;

  @Input()
  showHeadline!: boolean;

  formatTrackLength(ms_seconds: number): string{
    const totalSeconds = Math.floor(ms_seconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedHours = hours > 0 ? `${hours.toString()}:` : '';
    const formattedMinutes = minutes > 0 ? `${minutes.toString()}:` : '';
    const formattedSeconds =  `${seconds.toString().padStart(2, "0")}`;

    return `${formattedHours}${formattedMinutes}${formattedSeconds}`
  }

}
