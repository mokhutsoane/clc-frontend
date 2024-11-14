import { Routes } from '@angular/router';
import { isAuthenticatedGuardGuard } from './is-authenticated-guard.guard';

export const routes: Routes = [
  {
    canActivate: [isAuthenticatedGuardGuard],
    path: '',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./auth/login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'auth/register',
    loadComponent: () =>
      import('./auth/register/register.page').then(m => m.RegisterPage),
  },
  {
    canActivate: [isAuthenticatedGuardGuard],

    path: 'house-detail/:id',
    loadComponent: () =>
      import('./home/house-detail/house-detail.page').then(
        m => m.HouseDetailPage,
      ),
  },
  {
    path: '**',
    pathMatch: 'full',
    loadComponent: () =>
      import('./page-error/page-not-fount/page-not-fount.page').then(
        mod => mod.PageNotFountPage,
      ),
  },
];
