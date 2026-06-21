import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule, MatDividerModule],
  template: `
    <div class="logo-area">
      <mat-icon>storefront</mat-icon>
      <span>Artisan Admin</span>
    </div>
    <mat-nav-list>
      <a mat-list-item routerLink="/dashboard" routerLinkActive="active-link">
        <mat-icon matListItemIcon>dashboard</mat-icon>
        <span matListItemTitle>Tableau de bord</span>
      </a>
      <mat-divider></mat-divider>
      <p mat-subheader>CATALOGUE</p>
      <a mat-list-item routerLink="/products" routerLinkActive="active-link">
        <mat-icon matListItemIcon>inventory_2</mat-icon>
        <span matListItemTitle>Produits</span>
      </a>
      <mat-divider></mat-divider>
      <p mat-subheader>GESTION</p>
      <a mat-list-item routerLink="/orders" routerLinkActive="active-link">
        <mat-icon matListItemIcon>shopping_cart</mat-icon>
        <span matListItemTitle>Commandes</span>
      </a>
      <a mat-list-item routerLink="/users" routerLinkActive="active-link">
        <mat-icon matListItemIcon>people</mat-icon>
        <span matListItemTitle>Utilisateurs</span>
      </a>
      <mat-divider></mat-divider>
      <!--<p mat-subheader>COMMUNICATION</p>
      <a mat-list-item routerLink="/notifications" routerLinkActive="active-link">
        <mat-icon matListItemIcon>notifications</mat-icon>
        <span matListItemTitle>Notifications</span>
      </a>-->
    </mat-nav-list>
    <div class="logout-area">
      <button mat-list-item (click)="logout()">
        <mat-icon>logout</mat-icon> Déconnexion
      </button>
    </div>
  `,
  styles: [`
    :host { display: flex; flex-direction: column; height: 100%; }
    .logo-area { display:flex; align-items:center; gap:10px; padding:20px 16px;
      color:#fff; font-weight:600; font-size:16px; border-bottom:1px solid rgba(255,255,255,0.1); }
    .logo-area mat-icon { color:#FFB74D; }
    mat-nav-list { flex:1; }
    p[mat-subheader] { color:rgba(255,255,255,0.5); font-size:11px; padding-left:16px; }
    a[mat-list-item] { color:rgba(255,255,255,0.8); border-radius:8px; margin:2px 8px; }
    a[mat-list-item]:hover, .active-link { background:rgba(255,255,255,0.12) !important; color:#fff !important; }
    mat-icon { color:rgba(255,255,255,0.7); }
    .logout-area { padding:16px; border-top:1px solid rgba(255,255,255,0.1); }
    .logout-area button { color:rgba(255,255,255,0.7); width:100%; display:flex; align-items:center; gap:8px; background:none; border:none; cursor:pointer; font-size:14px; padding:8px; border-radius:8px; }
    .logout-area button:hover { background:rgba(255,255,255,0.12); color:#fff; }
  `]
})
export class SidenavComponent {
  private auth = inject(AuthService);
  logout() { this.auth.logout(); }
}
