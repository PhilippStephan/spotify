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

}
