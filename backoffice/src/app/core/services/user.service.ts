// src/app/core/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Utilisateur {
  id: string;
  nom: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/utilisateurs`;

  getAll(): Observable<Utilisateur[]> {
    // return this.http.get<Utilisateur[]>(this.base);
    return of([
      { id:'1', nom:'Youssef Amrani',  email:'y.amrani@email.com',  role:'USER'  as const },
      { id:'2', nom:'Sara Benali',     email:'s.benali@email.com',  role:'USER'  as const },
      { id:'3', nom:'Admin Artisan',   email:'admin@artisan.ma',    role:'ADMIN' as const },
    ]).pipe(delay(300));
  }

  getByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.base}/email/${email}`);
  }

  update(id: string, user: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.base}/${id}`, user);
  }
}
