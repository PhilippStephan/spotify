import {Component, inject, Injectable} from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthService} from "auth/api-data-access";
import {USER_INTERFACE} from "shared/domain";
import {MatFormField} from "@angular/material/form-field";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs";
import {forEach} from "@angular-devkit/schematics";

@Component({
  selector: 'search-shell',
  standalone: true,
  imports: [CommonModule, MatFormField, MatButton, MatInput],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})

@Injectable({providedIn: 'root'})
export class ShellComponent {
  protected readonly sessionStorage = sessionStorage;
  activatedRoute = inject(ActivatedRoute)
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
