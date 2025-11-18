import { Component, Input, Output, inject, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-book-info',
  imports: [CommonModule],
  templateUrl: './show-book-info.html',
  styleUrl: './show-book-info.scss',
})
export class ShowBookInfo {
  @Input() isHome = false
  @Input() book!: BookModel;
  @Output() delete = new EventEmitter<number>();
  @Output() edit =  new EventEmitter<number>();
  @Output() add = new EventEmitter<any>();

  bookService = inject(Book)
  router = inject(Router)

  isClicked  = false
  hasBook = false

  onClick() {
    this.isClicked = !this.isClicked
  }

  deletarLivro() {
    this.delete.emit(this.book.id);
  }

  editarLivro() {
    console.log(this.book)
    console.log(this.book.id)
    this.edit.emit(this.book.id)
    this.bookService.setBook(this.book)
    this.router.navigate(["/books/edit"])
  }

  adicionarLivro() {
    const isbn = this.book.isbn.toString()

    this.bookService.observarLivro(isbn).subscribe({
      next: (res: any) => {
        if (res) {
          this.hasBook = true;
          return;
        }

        this.hasBook = false
        const bookToSend = {
          titulo: this.book.titulo,
          autor: this.book.autor,
          genero: this.book.genero,
          ano_lancamento: this.book.anoLancamento ?? (this.book as any).anoLancamento,
          isbn: Number(this.book.isbn)
        }

        this.add.emit(bookToSend);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
