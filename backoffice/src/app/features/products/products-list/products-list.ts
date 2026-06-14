import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService, Product } from '../../../core/services/product.service';
import { ProductFormDialogComponent } from '../product-form-dialog/product-form-dialog';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatSortModule, MatPaginatorModule,
    MatButtonModule, MatIconModule, MatCardModule,
    MatFormFieldModule, MatInputModule, MatDialogModule, MatSnackBarModule
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.scss'
})
export class ProductsListComponent implements OnInit {
  private productService = inject(ProductService);
  private dialog = inject(MatDialog);
  private snack = inject(MatSnackBar);

  products: Product[] = [];
  filtered: Product[] = [];
  columns = ['name', 'category', 'price', 'stock', 'actions'];

  ngOnInit() { this.load(); }

  load() {
    this.productService.getAll().subscribe(data => {
      this.products = data;
      this.filtered = data;
    });
  }

  onSearch(e: Event) {
    const q = (e.target as HTMLInputElement).value.toLowerCase();
    this.filtered = this.products.filter(p =>
      p.nom.toLowerCase().includes(q) || p.categorie.toLowerCase().includes(q)
    );
  }

  openCreate() {
    this.dialog.open(ProductFormDialogComponent, { width: '500px', data: {} })
      .afterClosed().subscribe(result => {
      if (result) {
        this.productService.create(result).subscribe(() => {
          this.snack.open('Produit créé !', 'OK', { duration: 3000 });
          this.load();
        });
      }
    });
  }

  openEdit(product: Product) {
    this.dialog.open(ProductFormDialogComponent, { width: '500px', data: { product } })
      .afterClosed().subscribe(result => {
      if (result && product.id) {
        this.productService.update(product.id, result).subscribe(() => {
          this.snack.open('Produit mis à jour !', 'OK', { duration: 3000 });
          this.load();
        });
      }
    });
  }

  confirmDelete(product: Product) {
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Supprimer "${product.nom}" ?` }
    }).afterClosed().subscribe(ok => {
      if (ok && product.id) {
        this.productService.delete(product.id).subscribe(() => {
          this.snack.open('Produit supprimé', 'OK', { duration: 3000 });
          this.load();
        });
      }
    });
  }
}
