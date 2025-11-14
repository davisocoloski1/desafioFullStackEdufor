import { Component, Input, Output, inject, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-show-book-info',
  imports: [],
  templateUrl: './show-book-info.html',
  styleUrl: './show-book-info.scss',
})
export class ShowBookInfo implements OnChanges {
  @Input() book!: BookModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit =  new EventEmitter<number>();

  bookService = inject(Book)
  router = inject(Router)

  titulo = this.book?.titulo
  autor = this.book?.autor
  ano_lancamento = this.book?.ano_lancamento
  genero = this.book?.genero
  isbn = this.book?.isbn
  
  ngOnChanges() {
    if (this.book) {
      this.titulo = this.book.titulo
      this.autor = this.book.autor
      this.ano_lancamento = this.book.ano_lancamento
      this.genero = this.book.genero
      this.isbn = this.book.isbn
    }
  }

  isClicked  = false

  onClick() {
    this.isClicked = !this.isClicked
  }

  deletarLivro() {
    this.delete.emit(this.book.id);
  }

  editarLivro() {
    console.log(this.book.id)
    this.edit.emit(this.book.id)
    this.bookService.setBook(this.book)
    this.router.navigate(["/books/edit"])
  }
}
