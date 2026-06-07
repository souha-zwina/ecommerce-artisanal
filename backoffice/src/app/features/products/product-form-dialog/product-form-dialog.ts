// src/app/features/products/product-form-dialog/product-form-dialog.ts
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/services/product.service';

@Component({
  selector: 'app-product-form-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ isEdit ? 'Modifier' : 'Nouveau' }} Produit</h2>
    <mat-dialog-content>
      <form [formGroup]="form" style="display:flex;flex-direction:column;gap:12px;padding-top:8px">
        <mat-form-field appearance="outline">
          <mat-label>Nom du produit</mat-label>
          <input matInput formControlName="name">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" rows="3"></textarea>
        </mat-form-field>
        <div style="display:flex;gap:12px">
          <mat-form-field appearance="outline" style="flex:1">
            <mat-label>Prix (MAD)</mat-label>
            <input matInput type="number" formControlName="price">
          </mat-form-field>
          <mat-form-field appearance="outline" style="flex:1">
            <mat-label>Stock</mat-label>
            <input matInput type="number" formControlName="stock">
          </mat-form-field>
        </div>
        <mat-form-field appearance="outline">
          <mat-label>Catégorie</mat-label>
          <mat-select formControlName="category">
            <mat-option value="poterie">Poterie</mat-option>
            <mat-option value="tissage">Tissage</mat-option>
            <mat-option value="bijoux">Bijoux</mat-option>
            <mat-option value="vannerie">Vannerie</mat-option>
            <mat-option value="bois">Bois</mat-option>
          </mat-select>
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Artisan</mat-label>
          <input matInput formControlName="artisan">
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Ville</mat-label>
          <input matInput formControlName="city">
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="dialogRef.close()">Annuler</button>
      <button mat-raised-button color="primary"
              [disabled]="form.invalid" (click)="submit()">
        {{ isEdit ? 'Mettre à jour' : 'Créer' }}
      </button>
    </mat-dialog-actions>
  `
})
export class ProductFormDialogComponent {
  form: FormGroup;    // ← déclaré sans valeur initiale
  isEdit: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product?: Product },
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ProductFormDialogComponent>
  ) {
    // ← tout initialisé ICI dans le constructeur, pas au niveau de la classe
    this.isEdit = !!data.product;
    this.form = this.fb.group({
      name:        [data.product?.name        || '', [Validators.required]],
      description: [data.product?.description || '', [Validators.required]],
      price:       [data.product?.price       ?? null, [Validators.required, Validators.min(1)]],
      stock:       [data.product?.stock       ?? null, [Validators.required, Validators.min(0)]],
      category:    [data.product?.category    || '', [Validators.required]],
      artisan:     [data.product?.artisan     || ''],
      city:        [data.product?.city        || ''],
    });
  }

  submit() {
    if (this.form.valid) this.dialogRef.close(this.form.value);
  }
}
