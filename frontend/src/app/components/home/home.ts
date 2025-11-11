import { Component, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { SearchBook } from "../search-book/search-book";
import { AddBookBtn } from "../add-book-btn/add-book-btn";
import { ActionsSelect } from '../actions-select/actions-select';
import { BookInfoForm } from '../book-info-form/book-info-form';
import { FormControl, ReactiveFormsModule  } from '@angular/forms';
import { BooksIndex } from "../books-index/books-index";
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Book } from '../../services/book';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SearchBook, AddBookBtn, ActionsSelect, BookInfoForm, ReactiveFormsModule, BooksIndex],
  templateUrl: './home.html',
   standalone: true,
  styleUrl: './home.scss',
})

export class Home {
  http = inject(HttpClient)
  router = inject(Router)
  url = environment.apiUrl
  login = false

  constructor(private bookService: Book) {}

  selected: string = 'Adicionar'
  isDelete: boolean = false
  
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

  limpar() {
    this.titulo.setValue('')
    this.autor.setValue('')
    this.ano.setValue('')
    this.genero.setValue('')
    this.isbn.setValue('')
  }

  checkNullValues() {
    let hasError = false
    if (this.titulo.value?.trim()) this.titlePlaceholder = 'Campo obrigatório'; hasError = true
    if (this.autor.value?.trim()) this.autorPlaceholder = 'Campo obrigatório'; hasError = true
    if (this.ano.value?.trim()) this.anoPlaceholder = 'Campo obrigatório'; hasError = true
    if (this.genero.value?.trim()) this.generoPlaceholder = 'Campo obrigatório'; hasError = true
    if (this.isbn.value?.trim()) this.isbnPlaceholder = 'Campo obrigatório'; hasError = true
    
    if (hasError) return;
  }

  bookMenuAction() {
    let titulo = this.titulo.value ?? '';
    let autor = this.autor.value ?? '';
    let ano = Number(this.ano.value ?? 0);
    let genero = this.genero.value ?? '';
    let isbn = Number(this.isbn.value ?? 0);
    let bookId = Number(this.bookId.value ?? 0);
    console.log(this.selected)

    if (this.selected === 'Adicionar') {
      this.bookService.adicionarLivro({ titulo, autor, ano_lancamento: ano, genero, isbn }).subscribe({
        next: (res: any) => console.log(res),
        error: (err) => console.log(err.error)
      })
    } else if (this.selected === 'Editar') {
      this.bookService.editarLivro(bookId, { titulo, autor, ano_lancamento: ano, genero, isbn }).subscribe({
        next: (res: any) => console.log(res),
        error: (err) => console.log(err.error)
      })
    } else if (this.selected === 'Deletar') {
      this.bookService.deletarLivro(bookId).subscribe({
        next: (res: any) => console.log(res),
        error: (err) => console.log(err.error)
      })
    }
  }
}
