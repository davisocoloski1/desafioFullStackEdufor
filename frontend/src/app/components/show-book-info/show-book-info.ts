import { Component, Input, Output, inject, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-show-book-info',
  imports: [],
  templateUrl: './show-book-info.html',
  styleUrl: './show-book-info.scss',
})
export class ShowBookInfo implements OnInit {
  @Input() isHome = false
  @Input() book!: BookModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit =  new EventEmitter<number>();
  @Output() add = new EventEmitter<any>();

  bookService = inject(Book)
  router = inject(Router)

  ngOnInit(): void {
    if (this.router.url === '/home') {
      this.isHome = true
    } else this.isHome = false
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

  adicionarLivro() {
    console.log('FILHO (REAL):', this.book)
      
    const bookToSend = {
      titulo: this.book.titulo,
      autor: this.book.autor,
      genero: this.book.genero,
      ano_lancamento: this.book.anoLancamento ?? (this.book as any).anoLancamento,
      isbn: Number(this.book.isbn)
    }

  this.add.emit(bookToSend)
  }
}
