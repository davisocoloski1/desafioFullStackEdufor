import { Component, inject } from '@angular/core';
import { TopNavbar } from "../../components/top-navbar/top-navbar";
import { BookEdit } from "../../components/book-edit/book-edit";
import { ShowBookInfo } from "../../components/show-book-info/show-book-info";
import { CommonModule } from '@angular/common';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';
import { SearchBook } from "./search-book/search-book";
import { ɵInternalFormsSharedModule } from "@angular/forms";

@Component({
  selector: 'app-home',
  imports: [TopNavbar, BookEdit, ShowBookInfo, CommonModule, SearchBook, ɵInternalFormsSharedModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  books: BookModel[] = []
  isEditing = false
  warnText = ''

  bookService = inject(Book)
  
  deletarLivro(id: number) {
    this.bookService.deletarLivro(id).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err.error)
    })
  }

  pesquisarLivro(valor: string) {
    this.bookService.pesquisarLivrosPublicos(valor).subscribe({
      next: (res: any) => {
        this.books = res
        console.log(this.books)

        if (this.books.length === 0) {
          this.warnText = 'Nenhum livro encontrado.'
        }
      }, error: () => {
        this.warnText = 'Erro ao procurar livros. Tente novamente.'
      }
    })
  }

  adicionarLivro(book: { titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: number}) {
    console.log('LIVRO RECEBIDO NO PAI', book)

    if (!book) {
      console.warn('BOOK VEIO null/undefined NO EVENTO')
      return
    }

    const payload = {
      titulo: book.titulo,
      autor: book.autor,
      ano_lancamento: Number(book.ano_lancamento),
      genero: book.genero,
      isbn: Number(book.isbn)
    }

    this.bookService.adicionarLivro({ titulo: book.titulo, autor: book.autor, ano_lancamento: book.ano_lancamento, genero: book.genero, isbn: Number(book.isbn)}).subscribe({
      next: (res: any) => {
        console.log(res)
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }
}
