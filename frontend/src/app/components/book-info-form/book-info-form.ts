import { Component, ElementRef, HostListener, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { Book } from '../../services/book';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-book-info-form',
  imports: [],
  templateUrl: './book-info-form.html',
  styleUrl: './book-info-form.scss',
})
export class BookInfoForm implements OnInit {
  active: boolean = false
  bookService = inject(Book)
  @Output() ultimoLivroEncontrado = new EventEmitter<boolean>();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.ultimoLivro()
  }

  title: any
  autor: any
  ano_lancamento: any
  genero: any
  isbn: any
  bookId: any

  deletarLivro() {
    this.bookService.deletarLivro(this.bookId).subscribe({
      next: (res: any) => {
        console.log(res)

        setTimeout(() => {
          window.location.reload()
        }, 2000)
      },
      error: (err: any) => {
        const msg = err.error?.message
        alert(msg)
      }
    })
  }

  editarLivro() {
    // this.bookService.editarLivro(this.bookId, {})
  }

  ultimoLivro() {
    this.bookService.exibirUltimoLivro().subscribe({
      next: (res: any) => {
        if (!res) {
          this.ultimoLivroEncontrado.emit(false)
          return;
        }

        this.ultimoLivroEncontrado.emit(true)
        this.bookId = res.id
        this.title = res.titulo
        this.autor = res.autor
        this.ano_lancamento = res.anoLancamento
        this.genero = res.genero
        this.isbn = res.isbn
        console.log(res)
      },
      error: (err: any) => console.log(err.error)
    })
  }

  toggleOptions(event: MouseEvent) {
    event.stopPropagation();
    this.active = !this.active
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target)) this.active = false;
  }
}
