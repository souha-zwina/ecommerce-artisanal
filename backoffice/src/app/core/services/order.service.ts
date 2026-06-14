// src/app/core/services/order.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

// ← correspond exactement aux champs de Commande.java
export interface Order {
  id: string;
  utilisateurId: string;
  produitIds: string[];
  total: number;
  statut: string;
  dateCommande: string;
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/commandes`;

  // GET /api/commandes
  getAll(): Observable<Order[]> {
    return this.http.get<Order[]>(this.base);  // ← plus /commandes en double
  }

  // GET /api/commandes/{id}
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
