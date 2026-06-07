// src/app/core/services/order.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Order {
  id: string;
  clientName: string;
  clientEmail: string;
  items: { productName: string; quantity: number; price: number }[];
  total: number;
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  address: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/commandes`;

  getAll(): Observable<Order[]> {
    // return this.http.get<Order[]>(this.base);
    return of([
      { id:'ORD-001', clientName:'Youssef Amrani', clientEmail:'y@email.com',
        items:[{productName:'Tajine peint', quantity:2, price:280}],
        total:560, status:'PENDING' as const,          // ← as const fix
        createdAt:'2026-06-06', address:'Fès' },
      { id:'ORD-002', clientName:'Sara Benali', clientEmail:'s@email.com',
        items:[{productName:'Tapis Beni Ourain', quantity:1, price:2800}],
        total:2800, status:'CONFIRMED' as const,
        createdAt:'2026-06-05', address:'Rabat' },
      { id:'ORD-003', clientName:'Karim Tazi', clientEmail:'k@email.com',
        items:[{productName:'Bracelet Khamsa', quantity:1, price:380}],
        total:380, status:'SHIPPED' as const,
        createdAt:'2026-06-04', address:'Casablanca' },
      { id:'ORD-004', clientName:'Nadia El Fassi', clientEmail:'n@email.com',
        items:[{productName:'Coffret thuya', quantity:1, price:340}],
        total:340, status:'DELIVERED' as const,
        createdAt:'2026-06-03', address:'Marrakech' },
    ]).pipe(delay(300));
  }

  getById(id: string): Observable<Order> {
    return this.http.get<Order>(`${this.base}/${id}`);
  }

  // PUT /api/commandes/{id}/statut?statut=CONFIRMED
  changeStatus(id: string, statut: string): Observable<Order> {
    return this.http.put<Order>(
      `${this.base}/${id}/statut`,
      null,
      { params: { statut } }
    );
  }
}
