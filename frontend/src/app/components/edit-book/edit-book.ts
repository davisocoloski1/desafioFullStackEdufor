import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../services/book';
import { AddBookBtn } from '../add-book-btn/add-book-btn';

@Component({
  selector: 'app-edit-book',
  imports: [AddBookBtn, RouterLink, ReactiveFormsModule],
  templateUrl: './edit-book.html',
  styleUrl: './edit-book.scss',
})
export class EditBook {
  bookService = inject(Book)
  router = inject(Router)
  
  warnText = ''
  hasError = false
  book = this.bookService.selectedBook

  idPlaceholder = `ID do livro: `
  titlePlaceholder = 'Título'
  autorPlaceholder = 'Autor'
  anoPlaceholder = 'Ano de Lançamento'
  generoPlaceholder = 'Gênero'
  isbnPlaceholder = 'ISBN'

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
        this.idPlaceholder = `ID do livro: `,
        this.titlePlaceholder = 'Título',
        this.autorPlaceholder = 'Autor',
        this.anoPlaceholder = 'Ano de Lançamento',
        this.generoPlaceholder = 'Gênero',
        this.isbnPlaceholder = 'ISBN'
    }, 5000)
  }

    bookMenuAction() {
    let titulo = this.titulo.value ?? '';
    let autor = this.autor.value ?? '';
    let ano = Number(this.ano.value ?? 0);
    let genero = this.genero.value ?? '';
    let isbn = Number(this.isbn.value ?? 0);

    if (!this.hasError) {
      this.bookService.editarLivro(this.book().id, {titulo: titulo, autor: autor, ano_lancamento: ano, genero: genero, isbn: isbn}).subscribe({
        next: (res: any) => {
          console.log(res)
          this.warnText = 'Livro editado!'
          this.router.navigate(["/public_books"])
        }, error: (err: any) => {
          if (err.status === 401) {
            this.warnText = 'Você precisa fazer login para editar'
          } else {
            this.warnText = 'Falha ao editar livro'
          }
        }
      })
    }
  }
}
