import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { OrderService, Order } from '../../../core/services/order.service';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-order-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatCardModule, MatButtonModule,
    MatIconModule, MatDialogModule, MatSnackBarModule, CurrencyPipe, DatePipe],
  templateUrl: './order-detail.html'
})
export class OrderDetailComponent implements OnInit {
  private route        = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  private dialog       = inject(MatDialog);
  private snack        = inject(MatSnackBar);

  order: Order | null = null;

  nextActions: { [key: string]: string[] } = {
    'PENDING':   ['CONFIRMED', 'CANCELLED'],
    'CONFIRMED': ['SHIPPED'],
    'SHIPPED':   ['DELIVERED'],
    'DELIVERED': [],
    'CANCELLED': []
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.orderService.getAll().subscribe(orders => {
      this.order = orders.find(o => o.id === id) || null;
    });
  }

  changeStatus(newStatus: string) {
    if (!this.order) return;
    this.dialog.open(ConfirmDialogComponent, {
      data: { message: `Passer la commande en "${newStatus}" ?` }
    }).afterClosed().subscribe(ok => {
      if (ok && this.order) {
        this.orderService.changeStatus(this.order.id, newStatus).subscribe(() => {
          this.order!.statut = newStatus;
          this.snack.open('Statut mis à jour !', 'OK', { duration: 3000 });
        });
      }
    });
  }
}
