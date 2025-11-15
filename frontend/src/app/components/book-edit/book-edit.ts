import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../services/book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.scss',
})
export class BookEdit implements OnInit {
  bookService = inject(Book)
  router = inject(Router)
  
  book = this.bookService.selectedBook()
  allowed = true
  
  titulo = new FormControl('')
  autor = new FormControl('')
  ano = new FormControl('')
  genero = new FormControl('')
  isbn = new FormControl('')
  
  errorText = ''
  actionButton = 'Adicionar'
  tituloPlaceholder = 'Título'
  autorPlaceholder = 'Autor'
  anoPlaceholder = 'Ano de Lançamento'
  generoPlaceholder = 'Gênero'
  isbnPlaceholder = 'ISBN'

  ngOnInit(): void {
    if (this.router.url === "/home") this.actionButton = 'Adicionar'  
    if (this.router.url === "/books/edit") {
      this.actionButton = 'Editar' 
      this.isbnPlaceholder = String(this.book?.isbn ?? 'Inválido')
    }
  }

  limpar() {
    this.titulo.setValue('')
    this.autor.setValue('')
    this.ano.setValue('')
    this.genero.setValue('')
    this.isbn.setValue('')
  }

  checkNullValues() {
    if (!this.isbn.value?.trim()) { this.errorText = 'O campo "ISBN" é obrigatório'; this.allowed = false }
    if (!this.genero.value?.trim()) { this.errorText = 'O campo "Gênero" é obrigatório'; this.allowed = false }
    if (!this.ano.value?.trim()) { this.errorText = 'O campo "Ano de Lançamento" é obrigatório' ; this.allowed = false }
    if (!this.autor.value?.trim()) { this.errorText = 'O campo "Autor" é obrigatório'; this.allowed = false }
    if (!this.titulo.value?.trim()) { this.errorText = 'O campo "Título" é obrigatório'; this.allowed = false }
    else { this.allowed = true }

    setTimeout(() => {
      this.tituloPlaceholder = 'Título'
      this.autorPlaceholder = 'Autor'
      this.anoPlaceholder = 'Ano de Lançamento'
      this.generoPlaceholder = 'Gênero'
      this.isbnPlaceholder = 'ISBN'
    }, 5000)
  }

  enviarLivro() {
    let titulo = this.titulo.value ?? ''
    let autor = this.autor.value ?? ''
    let ano = Number(this.ano.value ?? 0)
    let genero = this.genero.value ?? ''
    let isbn = Number(this.isbn.value?.trim() ?? this.book?.isbn ?? 0)

    const id = this.book?.id

    
    if (this.allowed && this.router.url === "/home") {
      this.criarLivro(titulo, autor, ano, genero, isbn)
    } else if (this.allowed && this.router.url === "/books/edit") {
      if (id === undefined) {
        this.errorText = 'Livro não encontrado.'
        return
      }
      this.editarLivro(id, titulo, autor, ano, genero, isbn)
    }

  }

  criarLivro( titulo: string , autor: string, ano_lancamento: number, genero: string, isbn: number) {
    this.bookService.adicionarLivro({ titulo, autor, ano_lancamento: ano_lancamento, genero, isbn }).subscribe({
      next: (res: any) => {
        console.log(res)
        this.errorText = ''
      },
      error: (err: any) => {
        if (err.error.errors) {
          console.log(err.error?.errors[0].message)
          this.errorText = err.error?.errors[0].message
        } else if (err.error?.message) {
          console.log(err.error.message)
          this.errorText = err.error.message
        }
      }
    })
  }

  editarLivro(id: number, titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: number) {
    this.bookService.editarLivro(id, { titulo, autor, ano_lancamento, genero, isbn }).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err.error)
    })
  }
}
