import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import {
  Chart, registerables
} from 'chart.js';

import { StatisticsService, DashboardSummary } from '../../core/services/statistics.service';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatTableModule, RouterLink, BaseChartDirective, CurrencyPipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class DashboardComponent implements OnInit {
  private statsService = inject(StatisticsService);

  summary: DashboardSummary | null = null;

  stats = [
    { label: 'Utilisateurs',   value: 0, icon: 'people',        color: 'blue'   },
    { label: 'Produits',       value: 0, icon: 'inventory_2',   color: 'green'  },
    { label: 'Commandes auj.', value: 0, icon: 'shopping_cart', color: 'orange' },
    { label: 'CA ce mois (MAD)',value: 0, icon: 'payments',     color: 'purple' },
  ];

  lineChartData: ChartData<'line'> = {
    labels: [],
    datasets: [{
      label: 'Commandes',
      data: [],
      borderColor: '#2E75B6',
      backgroundColor: 'rgba(46,117,182,0.1)',
      fill: true, tension: 0.4
    }]
  };

  lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } }
  };

  doughnutData: ChartData<'doughnut'> = {
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }]
  };

  recentOrders = [
    { id: 'ORD-001', clientName: 'Youssef Amrani', total: 560,  status: 'PENDING'   },
    { id: 'ORD-002', clientName: 'Sara Benali',    total: 2800, status: 'CONFIRMED' },
    { id: 'ORD-003', clientName: 'Karim Tazi',     total: 380,  status: 'SHIPPED'   },
    { id: 'ORD-004', clientName: 'Nadia El Fassi', total: 340,  status: 'DELIVERED' },
  ];
  displayedCols = ['id', 'client', 'total', 'status'];

  ngOnInit() {
    this.statsService.getSummary().subscribe(data => {
      this.summary = data;
      this.stats[0].value = data.totalUsers;
      this.stats[1].value = data.totalProducts;
      this.stats[2].value = data.ordersToday;
      this.stats[3].value = data.monthlyRevenue;
    });

    this.statsService.getOrdersTrend().subscribe(trend => {
      this.lineChartData = {
        ...this.lineChartData,
        labels: trend.map(t => t.date),
        datasets: [{ ...this.lineChartData.datasets[0], data: trend.map(t => t.count) }]
      };
    });

    this.statsService.getOrdersByStatus().subscribe(statuses => {
      this.doughnutData = {
        labels: statuses.map(s => s.label),
        datasets: [{ data: statuses.map(s => s.count), backgroundColor: statuses.map(s => s.color) }]
      };
    });
  }
}
