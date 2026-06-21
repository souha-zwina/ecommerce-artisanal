// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout/main-layout/main-layout').then(m => m.MainLayoutComponent),
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard').then(m => m.DashboardComponent)
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./features/products/products-list/products-list')
            .then(m => m.ProductsListComponent)
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./features/orders/orders-list/orders-list')
            .then(m => m.OrdersListComponent)
      },
      {
        path: 'orders/:id',
        loadComponent: () =>
          import('./features/orders/order-detail/order-detail')
            .then(m => m.OrderDetailComponent)
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./features/users/users-list/users-list')
            .then(m => m.UsersListComponent)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
