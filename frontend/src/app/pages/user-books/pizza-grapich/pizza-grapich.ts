import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Router } from '@angular/router';
import { BookModel } from '../../../models/book-model';

@Component({
  selector: 'app-pizza-grapich',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './pizza-grapich.html',
  styleUrl: './pizza-grapich.scss',
})
export class PizzaGrapich implements OnChanges {
  @Input() books: BookModel[] = [];

  pieChartType: ChartType = 'pie';

  pieData: ChartData<'pie'> = {
    labels: [],
    datasets: [{ data: [] }]
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['books'] && this.books) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    const genresCount: Record<string, number> = {};

    this.books.forEach((book) => {
      genresCount[book.genero] = (genresCount[book.genero] || 0) + 1;
    });

    this.pieData = {
      labels: Object.keys(genresCount),
      datasets: [{ data: Object.values(genresCount) }]
    };
  }
}
