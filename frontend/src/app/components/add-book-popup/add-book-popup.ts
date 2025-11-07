import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookInfo } from '../book-info/book-info';
import { BookActions } from '../book-actions/book-actions';

@Component({
  selector: 'app-add-book-popup',
  standalone: true,
  imports: [CommonModule, BookInfo, BookActions],
  templateUrl: './add-book-popup.html',
  styleUrl: './add-book-popup.scss',
})
export class AddBookPopup {
  @Input() title = '';
  @Input() show = false;
  @Output() close = new EventEmitter<void>();
  @Output() registrarLivro = new EventEmitter<any>();

  private livroTemp: any = null;

  fechar() {
    this.close.emit();
  }

  receberLivro(livro: any) {
    this.livroTemp = livro;
    console.log('Recebi o book-info: ', this.livroTemp)
  }

  adicionarLivro() {
    if (this.livroTemp) {
      alert('clicou no botao adicionar');
      this.registrarLivro.emit(this.livroTemp);
      this.fechar()
    }
  }
}
