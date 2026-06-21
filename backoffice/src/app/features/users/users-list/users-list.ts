// src/app/features/users/users-list/users-list.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UserService, Utilisateur } from '../../../core/services/user.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule,
    MatIconModule, MatFormFieldModule, MatInputModule,
    MatDialogModule, MatSnackBarModule],
  templateUrl: './users-list.html'
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  users: Utilisateur[] = [];
  filtered: Utilisateur[] = [];
  columns = ['nom', 'email', 'role', 'actions'];

  ngOnInit() {
    this.load();
  }

  load() {
    this.userService.getAll().subscribe(data => {
      this.users = data;
      this.filtered = data;
    });
  }

  onSearch(e: Event) {
    const q = (e.target as HTMLInputElement).value.toLowerCase();
    this.filtered = this.users.filter(u =>
      u.nom.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }

  toggleRole(user: Utilisateur) {
    const newRole = user.role === 'ADMIN' ? 'CLIENT' : 'ADMIN';
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Changer le rôle de ${user.nom} en ${newRole} ?` }
    }).afterClosed().subscribe(ok => {
      if (ok) {
        const updated: Utilisateur = { ...user, role: newRole };
        this.userService.update(user.id, updated).subscribe(() => {
          user.role = newRole;
          this.snack.open('Rôle mis à jour', 'OK', { duration: 3000 });
        });
      }
    });
  }
}
