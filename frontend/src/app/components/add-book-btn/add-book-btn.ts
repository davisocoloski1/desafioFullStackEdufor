import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-book-btn',
  imports: [],
  templateUrl: './add-book-btn.html',
  styleUrl: './add-book-btn.scss',
})
export class AddBookBtn {
  @Input() text = 'Adicionar';
}
