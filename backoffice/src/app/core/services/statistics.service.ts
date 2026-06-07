import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DashboardSummary {
  totalUsers: number;
  totalProducts: number;
  ordersToday: number;
  monthlyRevenue: number;
  lowStockCount: number;
}

@Injectable({ providedIn: 'root' })
export class StatisticsService {

  getSummary(): Observable<DashboardSummary> {
    // Remplacer par: return this.http.get<DashboardSummary>(`${apiUrl}/admin/stats`);
    return of({
      totalUsers: 142,
      totalProducts: 87,
      ordersToday: 12,
      monthlyRevenue: 45800,
      lowStockCount: 5
    }).pipe(delay(300));
  }

  getOrdersTrend(): Observable<{ date: string; count: number }[]> {
    const data = Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - i * 86400000)
        .toLocaleDateString('fr-FR', { day:'2-digit', month:'2-digit' }),
      count: Math.floor(Math.random() * 20) + 5
    })).reverse();
    return of(data).pipe(delay(200));
  }

  getOrdersByStatus(): Observable<{ label: string; count: number; color: string }[]> {
    return of([
      { label: 'En attente',  count: 18, color: '#FFC107' },
      { label: 'Confirmé',   count: 34, color: '#2196F3' },
      { label: 'Expédié',    count: 22, color: '#FF9800' },
      { label: 'Livré',      count: 68, color: '#4CAF50' },
    ]).pipe(delay(200));
  }
}
