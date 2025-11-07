import { Component } from '@angular/core';
import { AddBookPopup } from '../add-book-popup/add-book-popup';
import { CommonModule } from '@angular/common';
import { BookInfo } from "../book-info/book-info";
import { ShowBooks } from '../show-books/show-books';

@Component({
  selector: 'app-add-book',
  imports: [CommonModule, AddBookPopup, BookInfo, ShowBooks],
  templateUrl: './add-book.html',
  styleUrl: './add-book.scss',
})
export class AddBook {
  livros: any[] = [];
  mostrarModal = false;
  
  abrirModal() {
    this.mostrarModal = true;
  }

  fecharModal() {
    this.mostrarModal = false;
  }

  salvarLivro(livro: any) {
    this.livros.push(livro);
  }
}
