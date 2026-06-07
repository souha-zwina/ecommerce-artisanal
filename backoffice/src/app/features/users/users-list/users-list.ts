// src/app/features/users/users-list/users-list.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService, Utilisateur } from '../../../core/services/user.service';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule,
    MatButtonModule, MatIconModule, MatFormFieldModule, MatInputModule],
  templateUrl: './users-list.html'
})
export class UsersListComponent implements OnInit {
  private userService = inject(UserService);

  users: Utilisateur[] = [];
  filtered: Utilisateur[] = [];
  columns = ['nom', 'email', 'role', 'actions'];

  ngOnInit() {
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
}
