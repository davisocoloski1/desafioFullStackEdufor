import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Book } from '../../services/book';
import { environment } from '../../../environments/environment';
import { BookInfoForm } from '../book-info-form/book-info-form';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-books-public',
  imports: [RouterLink, BookInfoForm],
  templateUrl: './books-public.html',
  styleUrl: './books-public.scss',
})
export class BooksPublic implements OnInit{
  bookService= inject(Book)
  auth = inject(Auth)

  isLogged = this.auth.isLogged
  url = environment.apiUrl
  books: any[] = []

  ngOnInit(): void {
    this.exibirLivros()
  }

  deletarLivro(id: number) {
    console.log('Deletando livro: ', id)
    this.bookService.deletarLivro(id).subscribe({
      next: () => {
        this.books = this.books.filter(b => b.id !== id)
      },
      error: (err) => console.log(err.error)
    })
  }

  editarLivro(id: number) {
    console.log('Editando livro: ', id)
  }

  exibirLivros() {
    this.bookService.exibirLivros().subscribe({
      next: (res: any) => {
        this.books = res.data.filter((book:any) => !book.deletedAt)
        console.log(this.books)
      },
      error: (err: any) => console.log(err.error)
    })
  }
}
