import { Component, ElementRef, HostListener, inject } from '@angular/core';
import { Book } from '../../services/book';

@Component({
  selector: 'app-book-info-form',
  imports: [],
  templateUrl: './book-info-form.html',
  styleUrl: './book-info-form.scss',
})
export class BookInfoForm {
  active: boolean = false
  bookService = inject(Book)

  constructor(private elementRef: ElementRef) {}

  title = 'Titulo'
  autor = 'Autor'
  ano_lancamento = 2001
  genero = 'Suspense'
  isbn = 1231231231231
  bookId = 10

  deletarLivro() {
    this.bookService.deletarLivro(this.bookId).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err.error)
    })
  }

  editarLivro() {
    // this.bookService.editarLivro(this.bookId, {})
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
