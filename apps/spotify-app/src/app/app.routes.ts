import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('welcome/ui-welcome').then((m) => m.LandingpageComponent),
  },
  {
    path: 'callback',
    loadComponent: () => import('auth/ui-callback').then((m) => m.CallbackComponent),
  },
  {
    path: 'home',
    loadComponent: () => import('dashboard/ui-dashboard').then((m) => m.DashboardComponent)
  },
  {
    path: 'search',
    loadComponent: () => import('search/ui-search').then((m) => m.ShellComponent)
  },
  {
    path: 'library',
    loadComponent: () => import('library/ui-library').then((m) => m.ShellComponent)
  },
  {
    path: 'profile',
    loadComponent: () => import('profile/ui-profile').then((m) => m.ProfileDetailsComponent)
  },
];
