import { Component, inject, OnInit } from '@angular/core';
import { TopNavbar } from "../../components/top-navbar/top-navbar";
import { ShowBookInfo } from "../../components/show-book-info/show-book-info";
import { CommonModule } from '@angular/common';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';
import { SearchBook } from "./search-book/search-book";
import { ɵInternalFormsSharedModule } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { BarGrapich } from "../user-books/bar-graphic/bar-graphic";
import { PizzaGrapich } from "../user-books/pizza-grapich/pizza-grapich";

@Component({
  selector: 'app-home',
  imports: [TopNavbar, ShowBookInfo, CommonModule, SearchBook, ɵInternalFormsSharedModule, RouterLink, BarGrapich, PizzaGrapich],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  books: BookModel[] = []
  isEditing = false
  warnText = ''
  filtro = ''

  bookService = inject(Book)

  get isLogged() {
    return !!localStorage.getItem('token')
  }

  ngOnInit(): void {
    this.exibirLivros()
  }

  exibirLivros() {
    this.bookService.exibirPublicos().subscribe({
      next: (res: any) => {
        console.log(res.data)
        this.books = res.data
      }, error: (err: any) => {
        console.log(err.error)
        this.warnText = err.error.message
      }
    })
  }
  
  deletarLivro(id: number) {
    this.bookService.deletarLivro(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.warnText = 'Livro deletado.'
        this.exibirLivros()
      },
      error: (err: any) => console.log(err.error)
    })
  }

  pesquisarLivro(valor: string) {
    this.bookService.pesquisarLivrosPublicos(valor, this.filtro).subscribe({
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

  adicionarLivro(book: { titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: string}) {
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
      isbn: book.isbn
    }

    this.bookService.adicionarLivro({ titulo: book.titulo, autor: book.autor, ano_lancamento: book.ano_lancamento, genero: book.genero, isbn: book.isbn}).subscribe({
      next: (res: any) => {
        console.log(res)
      }, error: (err: any) => {
        console.log(err)
      }
    })
  }

  editarLivro(id: number) {
    console.log(id)
  }
}
