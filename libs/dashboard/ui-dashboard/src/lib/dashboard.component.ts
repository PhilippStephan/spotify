import {Component, inject, Injectable, input, ViewChild} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButton} from "@angular/material/button";
import {AuthService} from "auth/api-data-access";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {USER_INTERFACE} from "shared/domain";


@Component({
  selector: 'dashboard-dashboard',
  standalone: true,
  imports: [CommonModule, MatButton, MatFormField, MatInput],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
@Injectable({providedIn: 'root'})
export class DashboardComponent{

  @ViewChild('searchInput') searchInput: MatInput | undefined;

  protected readonly sessionStorage = sessionStorage;
  authService = inject(AuthService);
  artist: string = '';
  user: USER_INTERFACE | undefined;

  searchArtist(input: string) {
    const access_token = sessionStorage.getItem('access_token');
    if(access_token)
      console.log(access_token+ " " + input)
      this.authService.searchArtist(input).then(r => {
        console.log(r);
        this.artist = r;
      });
  }
}
