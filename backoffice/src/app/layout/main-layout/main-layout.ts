import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SidenavComponent } from '../sidenav/sidenav';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidenavComponent, HeaderComponent],
  template: `
    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav #sidenav mode="side" opened class="sidenav" [fixedInViewport]="true">
        <app-sidenav></app-sidenav>
      </mat-sidenav>
      <mat-sidenav-content>
        <app-header (toggleSidenav)="sidenav.toggle()"></app-header>
        <main class="main-content">
          <router-outlet></router-outlet>
        </main>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [`
    .sidenav-container { height: 100vh; }
    .sidenav { width: 240px; background: #1F3864; }
    .main-content { padding: 24px; }
  `]
})
export class MainLayoutComponent {}
