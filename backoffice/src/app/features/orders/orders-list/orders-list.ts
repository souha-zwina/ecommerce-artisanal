import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { OrderService, Order } from '../../../core/services/order.service';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatCardModule,
    MatButtonModule, MatButtonToggleModule, MatIconModule,
    FormsModule, CurrencyPipe, DatePipe],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.scss'
})
export class OrdersListComponent implements OnInit {
  private orderService = inject(OrderService);
  private userService = inject(UserService);

  orders: Order[] = [];
  filtered: Order[] = [];
  statusFilter = '';
  columns = ['id', 'client', 'total', 'statut', 'date', 'actions'];

  userNames: { [id: string]: string } = {};   // ← la "jointure" manuelle

  ngOnInit() {
    forkJoin({
      orders: this.orderService.getAll(),
      users: this.userService.getAll()
    }).subscribe(({ orders, users }) => {
      users.forEach(u => this.userNames[u.id] = u.nom);
      this.orders = orders;
      this.filtered = orders;
    });
  }

  getClientName(utilisateurId: string): string {
    return this.userNames[utilisateurId] || 'Client inconnu';
  }

  onStatusFilter() {
    this.filtered = this.statusFilter
      ? this.orders.filter(o => o.statut === this.statusFilter)
      : this.orders;
  }
}
