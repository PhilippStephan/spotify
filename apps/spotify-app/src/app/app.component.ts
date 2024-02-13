import {Component, inject, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterOutlet} from '@angular/router';
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatSidenav, MatSidenavContainer, MatSidenavContent, MatSidenavModule} from "@angular/material/sidenav";
import {SideNavigationComponent} from "side-navigation/ui-side-nav";
import {MatNestedTreeNode, MatTree, MatTreeNode, MatTreeNodeOutlet} from "@angular/material/tree";
import {MatToolbar} from "@angular/material/toolbar";
import {ProfileComponent} from "profile/ui-profile";
import {filter, map, Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AuthService} from "auth/api-data-access";
import {LandingpageComponent} from "welcome/ui-welcome";



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    MatButton,
    MatLabel,
    MatIcon,
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatSidenavModule,
    SideNavigationComponent,
    MatTree,
    MatTreeNode,
    MatTree,
    MatNestedTreeNode,
    MatTreeNodeOutlet,
    MatToolbar, ProfileComponent, AsyncPipe, MatIconButton, LandingpageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{

  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  title = 'spotify-app';
  showSideNav: boolean = true;
  router = inject(Router)
  authService = inject(AuthService);
  activatedRoute = inject(ActivatedRoute);


  protected readonly sessionStorage = sessionStorage;

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.showSideNav = !event.url.includes('/login'); // Hide side nav for login route
      }
    });
  }
}
