import {Component, Inject, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LogoutDialogComponent} from "profile/ui-logout";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'profile-profile',
  standalone: true,
  imports: [CommonModule, MatIcon, MatIconButton, MatMenu, MatButton, MatMenuItem, MatMenuTrigger, RouterLink, MatTooltip],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {


  router= inject(Router)
  route = inject(ActivatedRoute);
  protected readonly sessionStorage = sessionStorage;
  protected readonly navigator = navigator;


  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    this.dialog.open(LogoutDialogComponent);
  }
  navigateTo(input:string){
    window.open(input);
  }


}
