import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {map} from "rxjs";
import {AuthService} from "auth/api-data-access";
import {LandingpageComponent} from "welcome/ui-welcome";
import {ActivatedRoute, Router} from "@angular/router";
import {DashboardComponent} from "dashboard/ui-dashboard";
import {toSignal} from "@angular/core/rxjs-interop";

@Component({
  selector: 'callback-callback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './callback.component.html',
  styleUrl: './callback.component.css',
})
export class CallbackComponent {

  authService = inject(AuthService)
  dashboard = inject(DashboardComponent);
  route = inject(ActivatedRoute);
  router = inject(Router);

  successfulLogin = this.route.queryParamMap.pipe(map(async (params) => {
    const token = params.get('code');
    if (token) {
      await this.authService.requestToken(token);
      await this.authService.fetchProfile();
      this.router.navigate(['/']);
    } else {
      this.router.navigate(['/login']);
    }
  }))

  success = toSignal(this.successfulLogin)
}
