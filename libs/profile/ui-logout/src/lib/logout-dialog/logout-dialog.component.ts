import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "profile/ui-profile";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {Router} from "@angular/router";
import {AuthService} from "auth/api-data-access";

@Component({
  selector: 'logout-logout-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogContent, MatDialogTitle, MatDialogActions, MatButton, MatDialogClose],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css',
})
export class LogoutDialogComponent {

  router = inject(Router)
  authService=inject(AuthService)

  logout(){
    this.authService.removeSession()
  }
}
