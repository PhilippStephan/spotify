import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import { Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDialog} from "@angular/material/dialog";
import {LogoutDialogComponent} from "profile/ui-logout";
import {MatTooltip} from "@angular/material/tooltip";
import {MatDivider} from "@angular/material/divider";
import {ProfilePicComponent} from "shared/ui-profile-picture";

@Component({
  selector: 'profile-profile',
  standalone: true,
  imports: [CommonModule, MatIcon, MatIconButton, MatMenu, MatButton, MatMenuItem, MatMenuTrigger, RouterLink, MatTooltip, MatDivider, ProfilePicComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {

  dialog = inject(MatDialog);
  router= inject(Router);
  protected readonly navigator = navigator;
  protected storage = window.localStorage;


  openDialog(): void {
    this.dialog.open(LogoutDialogComponent);
  }
  navigateTo(input:string){
    window.open(input, "_blank");
  }


  navigateToIntern(input: string) {
    this.router.navigate([input]);
  }

    protected readonly alert = alert;
}
