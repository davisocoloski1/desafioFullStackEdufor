import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-books',
  imports: [CommonModule],
  templateUrl: './show-books.html',
  styleUrl: './show-books.scss',
})
export class ShowBooks {
  @Input() livros: any[] = []
}
