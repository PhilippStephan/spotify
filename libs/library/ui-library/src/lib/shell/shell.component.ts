import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'library-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.css',
})
export class ShellComponent {}
