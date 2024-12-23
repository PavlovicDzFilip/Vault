import { Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: ':noteId',
    loadComponent: () => import('./layout/layout.component').then(m => m.LayoutComponent),
    // canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    // canActivate: [NoAuthGuard],
  },
  {
    path: 'login/:token',
    loadComponent: () => import('./features/login/login.component').then(m => m.LoginComponent),
    // canActivate: [NoAuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }
];
