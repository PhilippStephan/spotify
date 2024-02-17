import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {USER_INTERFACE} from "shared/domain";
import {MatButton} from "@angular/material/button";
import {ProfilePicComponent} from "shared/ui-profile-picture";

@Component({
  selector: 'profile-profile-overview',
  standalone: true,
  imports: [
    MatButton,
    ProfilePicComponent
  ],
  templateUrl: './profile-overview.component.html',
  styleUrl: './profile-overview.component.css'
})
export class ProfileOverviewComponent {

  @Input() user!: USER_INTERFACE | null;

  protected readonly alert = alert;

}
