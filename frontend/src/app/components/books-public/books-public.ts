import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Book } from '../../services/book';
import { environment } from '../../../environments/environment';
import { BookInfoForm } from '../book-info-form/book-info-form';

@Component({
  selector: 'app-books-public',
  imports: [RouterLink, BookInfoForm],
  templateUrl: './books-public.html',
  styleUrl: './books-public.scss',
})
export class BooksPublic implements OnInit{
  bookService = inject(Book)
  url = environment.apiUrl
  books: any[] = []

  title: any
  autor: any
  ano_lancamento: any
  genero: any
  isbn: any

  ngOnInit(): void {
    this.exibirLivros()
  }

  alternarLivros() {
    for (let book of this.books) {
      this.title = book.titulo
      this.autor = book.autor
      this.ano_lancamento = book.ano_lancamento
      this.genero = book.genero
      this.isbn = book.isbn
    }
  }

  exibirLivros() {
    this.bookService.exibirLivros().subscribe({
      next: (res: any) => {
        this.books = res.data
        console.log(this.books)
      },
      error: (err: any) => console.log(err.error)
    })
  }
}
