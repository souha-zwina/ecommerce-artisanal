import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Product {
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  imageUrl?: string;
  artisan?: string;
  city?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private http = inject(HttpClient);
  private base = `${environment.apiUrl}/products`;

  getAll(): Observable<Product[]> {
    // return this.http.get<Product[]>(this.base);
    return of([
      { id:'1', name:'Tajine en poterie peinte', description:'Tajine artisanal de Fès', price:280, category:'poterie', stock:15, artisan:'Mohamed El Fassi', city:'Fès' },
      { id:'2', name:'Tapis berbère Beni Ourain', description:'Tapis en laine naturelle', price:2800, category:'tissage', stock:4, artisan:'Khadija Ait Benhaddou', city:'Azilal' },
      { id:'3', name:'Collier en argent et ambre', description:'Collier berbère en argent 925', price:750, category:'bijoux', stock:3, artisan:'Ibrahim Aït Mhand', city:'Tiznit' },
      { id:'4', name:'Panier à pain en doum', description:'Panier tressé en fibre de doum', price:130, category:'vannerie', stock:22, artisan:'Touria El Ouazzani', city:'Oujda' },
      { id:'5', name:'Coffret en bois de thuya', description:'Coffret à bijoux en thuya', price:340, category:'bois', stock:9, artisan:'Rachid Bensouda', city:'Essaouira' },
      { id:'6', name:'Vase en poterie de Safi', description:'Grand vase décoratif de Safi', price:420, category:'poterie', stock:8, artisan:'Hassan Zniber', city:'Safi' },
      { id:'7', name:'Bracelet Khamsa en argent', description:'Bracelet main de Fatma en argent', price:380, category:'bijoux', stock:10, artisan:'Younes Benali', city:'Essaouira' },
      { id:'8', name:'Chapeau de paille Tarfaya', description:'Chapeau tressé traditionnel', price:75, category:'vannerie', stock:2, artisan:'Brahim Oulad Ali', city:'Tarfaya' },
    ]).pipe(delay(300));
  }

  getById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.base}/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.base, product);
  }

  update(id: string, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.base}/${id}`, product);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}
