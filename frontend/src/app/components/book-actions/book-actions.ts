import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-book-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-actions.html',
  styleUrl: './book-actions.scss',
})
export class BookActions {
  @Output() adicionar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  clicar() {
    this.adicionar.emit();
    console.log('clicado');
  }

}
