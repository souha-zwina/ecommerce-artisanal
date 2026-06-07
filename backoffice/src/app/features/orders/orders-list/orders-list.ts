import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { OrderService, Order } from '../../../core/services/order.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatTableModule, MatCardModule,
    MatButtonModule, MatButtonToggleModule, MatIconModule, FormsModule,
    CurrencyPipe, DatePipe],
  templateUrl: './orders-list.html',
  styleUrl: './orders-list.scss'
})
export class OrdersListComponent implements OnInit {
  private orderService = inject(OrderService);

  orders: Order[] = [];
  filtered: Order[] = [];
  statusFilter = '';
  columns = ['id', 'client', 'total', 'status', 'date', 'actions'];

  ngOnInit() {
    this.orderService.getAll().subscribe(data => {
      this.orders = data;
      this.filtered = data;
    });
  }

  onStatusFilter() {
    this.filtered = this.statusFilter
      ? this.orders.filter(o => o.status === this.statusFilter)
      : this.orders;
  }
}
