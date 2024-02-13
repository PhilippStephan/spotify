import {Component, inject, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbar} from "@angular/material/toolbar";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {AuthService} from "auth/api-data-access";

@Component({
  selector: 'welcome-landingpage',
  standalone: true,
  imports: [CommonModule, MatToolbar, MatIcon, MatIconButton, MatButton, MatAnchor],
  templateUrl: './landingpage.component.html',
  styleUrl: './landingpage.component.css',
})

@Injectable({providedIn: 'root'})
export class LandingpageComponent {

  authService = inject(AuthService);

  requestAuth() {
    this.authService.requestAuth();
  }

}
