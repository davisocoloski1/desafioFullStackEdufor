import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { SearchBook } from "../search-book/search-book";
import { AddBookBtn } from "../add-book-btn/add-book-btn";
import { FormControl, ReactiveFormsModule  } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SearchBook, AddBookBtn, ReactiveFormsModule],
  templateUrl: './home.html',
   standalone: true,
  styleUrl: './home.scss',
})

export class Home {
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

  limpar() {
    this.titulo.setValue('')
    this.autor.setValue('')
    this.ano.setValue('')
    this.genero.setValue('')
    this.isbn.setValue('')
  }
}
