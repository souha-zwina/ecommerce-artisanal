// src/app/core/services/user.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Utilisateur {
  id: string;
  nom: string;
  prenom?: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/utilisateurs`;

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(this.base);
    /*return of([
      { id:'1', nom:'Admin',  prenom:'Super', email:'admin@test.com',     role:'ADMIN'  as const },
      { id:'2', nom:'Test',   prenom:'',      email:'test@example.com',   role:'CLIENT' as const },
    ]).pipe(delay(300));*/
  }

  getByEmail(email: string): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${this.base}/email/${email}`);
  }

  update(id: string, user: Partial<Utilisateur>): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${this.base}/${id}`, user);
  }
}
