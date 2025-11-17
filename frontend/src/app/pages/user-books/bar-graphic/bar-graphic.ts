import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../../services/book';
import { BaseChartDirective } from 'ng2-charts';
import { ChartData, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-bar-grapich',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './bar-graphic.html',
  styleUrl: './bar-graphic.scss',
})
export class BarGrapich implements OnInit {

  bookService = inject(Book)

  barData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Livros por Ano',
        data: [],
        borderWidth: 2
      }
    ]
  }

  barOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: { title: { display: true, text: 'Ano' }},
      y: { beginAtZero: true, title: { display: true, text: 'Quantidade' }}
    }
  };

  barChartType: 'bar' = 'bar';

  ngOnInit(): void {
    this.bookService.exibirLivros().subscribe((res: any) => {
      const yearsCount: Record<number, number> = {};

      res.data.forEach((book: any) => {
        const year = book.anoLancamento;
        yearsCount[year] = (yearsCount[year] || 0) + 1;
      });

      this.barData = {
        labels: Object.keys(yearsCount),
        datasets: [
          {
            label: 'Livros por Ano',
            data: Object.values(yearsCount),
          }
        ]
      };
    });
  }
}
