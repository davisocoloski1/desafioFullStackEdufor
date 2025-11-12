import { Component, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { SearchBook } from "../search-book/search-book";
import { AddBookBtn } from "../add-book-btn/add-book-btn";
import { BookInfoForm } from '../book-info-form/book-info-form';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { BooksIndex } from "../books-index/books-index";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../services/book';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SearchBook, AddBookBtn, BookInfoForm, ReactiveFormsModule, BooksIndex],
  templateUrl: './home.html',
   standalone: true,
  styleUrl: './home.scss',
})

export class Home {
  @Output() searchBtn = new EventEmitter<void>();
  books: any[] = []

  http = inject(HttpClient)
  router = inject(Router)
  bookService = inject(Book)
  auth = inject(Auth)
  
  url = environment.apiUrl
  mostrarLivro = true
  hasError = false
  empty = true
  
  isLogged = this.auth.isLogged

  warnText = ''
  searchText = ''
  titlePlaceholder = "Título"
  autorPlaceholder = "Autor"
  anoPlaceholder = "Ano de lançamento"
  generoPlaceholder = "Gênero"
  isbnPlaceholder = "ISBN"

  titulo = new FormControl('')
  autor = new FormControl('')
  ano = new FormControl('')
  genero = new FormControl('')
  isbn = new FormControl('')
  bookId = new FormControl('')
  // searchBar = new FormControl('')

  limpar() {
    this.titulo.setValue('')
    this.autor.setValue('')
    this.ano.setValue('')
    this.genero.setValue('')
    this.isbn.setValue('')
  }

  checkNullValues() {
    if (!this.titulo.value?.trim()) {
  this.titlePlaceholder = 'Campo obrigatório';
  this.hasError = true;
  }
  if (!this.autor.value?.trim()) {
    this.autorPlaceholder = 'Campo obrigatório';
    this.hasError = true;
  }
  if (!this.ano.value?.trim()) {
    this.anoPlaceholder = 'Campo obrigatório';
    this.hasError = true;
  }
  if (!this.genero.value?.trim()) {
    this.generoPlaceholder = 'Campo obrigatório';
    this.hasError = true;
  }
  if (!this.isbn.value?.trim()) {
    this.isbnPlaceholder = 'Campo obrigatório';
    this.hasError = true;
  }

  setTimeout(() => {
    this.titlePlaceholder = "Título"
    this.autorPlaceholder = "Autor"
    this.anoPlaceholder = "Ano de lançamento"
    this.generoPlaceholder = "Gênero"
    this.isbnPlaceholder = "ISBN"
  }, 5000)
    
    if (this.hasError) return;
  }

  bookMenuAction() {
    let titulo = this.titulo.value ?? '';
    let autor = this.autor.value ?? '';
    let ano = Number(this.ano.value ?? 0);
    let genero = this.genero.value ?? '';
    let isbn = Number(this.isbn.value ?? 0);

    if (!this.hasError) {
      this.bookService.adicionarLivro({ titulo, autor, ano_lancamento: ano, genero, isbn }).subscribe({
        next: (res: any) => {
          console.log(res)

          setTimeout(() => {
            window.location.reload();
          }, 2000)
        },
        error: (err) => {
          if (err.status === 401) {
            this.warnText = 'Você precisa fazer login/registro primeiro!'
            console.log(err.error)

            setTimeout(() => {
              this.warnText = ''
            }, 5000)
          }
        }
      })
    }
  }

  pesquisar(valor: string) {
    this.bookService.pesquisarLivro(valor).subscribe({
      next: (res: any) => {
        this.books = res
        if (this.books.length === 0) {
          this.searchText = 'Nenhum livro encontrado'
        } else this.warnText = 'Livros encotrados: '
      }, error: (err: any) => {
        if (err.status === 401) {
          this.searchText = 'Faça login para pesquisar livros.'

          setTimeout(() => {
            this.searchText = ''
          }, 5000)
        } else {
          console.log(err.error)
        }
      }
    })
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

  logout() {
    this.auth.logout(`${this.url}/usuarios/logout`).subscribe({
      next: (res: any) => {
        localStorage.removeItem('token');
        this.auth.isLogged.set(false)
        console.log(res)
        this.router.navigate([""])
        window.location.reload()
      },
      error: (err: any) => console.log(err.error)
    })
  }
}
