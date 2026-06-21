// src/app/core/services/statistics.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, map, catchError, of } from 'rxjs';
import { ProductService } from './product.service';
import { OrderService } from './order.service';
import { UserService } from './user.service';

export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  ordersToday: number;
  lowStockCount: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {
  private productService = inject(ProductService);
  private orderService = inject(OrderService);
  private userService = inject(UserService);

  getSummary(): Observable<DashboardSummary> {
    return forkJoin({
      products: this.productService.getAll(),
      orders: this.orderService.getAll(),
      users: this.userService.getAll().pipe(catchError(() => of([])))
    }).pipe(
      map(({ products, orders, users }) => {
        const today = new Date().toDateString();
        const thisMonth = new Date().getMonth();

        const ordersToday = orders.filter(o =>
          new Date(o.dateCommande).toDateString() === today
        ).length;

        const monthlyRevenue = orders
          .filter(o => new Date(o.dateCommande).getMonth() === thisMonth)
          .reduce((sum, o) => sum + o.total, 0);

        const lowStockCount = products.filter(p => p.stock < 5).length;

        return {
          totalUsers: users.length,
          totalProducts: products.length,
          ordersToday,
          monthlyRevenue,
          lowStockCount
        };
      })
    );
  }

  getOrdersByStatus(): Observable<{ label: string; count: number; color: string }[]> {
    const meta: { [key: string]: { label: string; color: string } } = {
      PENDING:   { label: 'En attente', color: '#FFC107' },
      CONFIRMED: { label: 'Confirmé',   color: '#2196F3' },
      SHIPPED:   { label: 'Expédié',    color: '#FF9800' },
      DELIVERED: { label: 'Livré',      color: '#4CAF50' },
      CANCELLED: { label: 'Annulé',     color: '#F44336' },
    };

    return this.orderService.getAll().pipe(
      map(orders => {
        const counts: { [key: string]: number } = {};
        orders.forEach(o => { counts[o.statut] = (counts[o.statut] || 0) + 1; });

        return Object.keys(counts).map(statut => ({
          label: meta[statut]?.label || statut,
          count: counts[statut],
          color: meta[statut]?.color || '#9E9E9E'
        }));
      })
    );
  }

  getOrdersTrend(): Observable<{ date: string; count: number }[]> {
    return this.orderService.getAll().pipe(
      map(orders => {
        const counts: { [key: string]: number } = {};
        orders.forEach(o => {
          const d = new Date(o.dateCommande)
            .toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
          counts[d] = (counts[d] || 0) + 1;
        });
        return Object.keys(counts).map(date => ({ date, count: counts[date] }));
      })
    );
  }
}
