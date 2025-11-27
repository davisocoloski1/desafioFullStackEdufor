import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Router } from '@angular/router';
import { BookModel } from '../../../models/book-model';

@Component({
  selector: 'app-bar-grapich',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-graphic.html',
  styleUrl: './bar-graphic.scss',
})
export class BarGrapich implements OnChanges {

  @Input() books: BookModel[] = [];

  showChart = false; // <-- flag para controlar exibição

  barData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Livros por Ano',
        data: [],
        borderWidth: 2
      }
    ]
  };

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Ano' }},
      y: { beginAtZero: true, title: { display: true, text: 'Quantidade' }}
    }
  };

  barChartType: 'bar' = 'bar';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['books'] && this.books) {
      this.processChartData(this.books);
    }
  }

  private processChartData(data: BookModel[]) {
    const yearsCount: Record<number, number> = {};

    data.forEach((book: any) => {
      const year = book.anoLancamento;
      yearsCount[year] = (yearsCount[year] || 0) + 1;
    });

    const labels = Object.keys(yearsCount);
    const values = Object.values(yearsCount);

    // 🔥 Se não houver dados, não mostra o gráfico
    if (labels.length === 0) {
      this.showChart = false;
      return;
    }

    this.showChart = true;

    this.barData = {
      labels,
      datasets: [
        {
          label: 'Livros por Ano',
          data: values
        }
      ]
    };
  }
}
