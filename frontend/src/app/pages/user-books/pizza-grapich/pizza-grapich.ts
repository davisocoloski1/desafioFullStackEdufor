import { Component, inject, OnInit } from '@angular/core';
import { Book } from '../../../services/book';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pizza-grapich',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pizza-grapich.html',
  styleUrl: './pizza-grapich.scss',
})
export class PizzaGrapich implements OnInit {
  bookService = inject(Book)

  pieChartType: ChartType = 'pie';

  pieData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  ngOnInit(): void {
    this.bookService.exibirLivros().subscribe((res: any) => {
      const books: {
        genero: string;
      }[] = res.data

      const genresCount: Record<string, number> = {};

      books.forEach((book) => {
        genresCount[book.genero] = (genresCount[book.genero] || 0) + 1;
      });

      this.pieData = {
        labels: Object.keys(genresCount),
        datasets: [{ data: Object.values(genresCount) }]
      };
    });
  }
}
