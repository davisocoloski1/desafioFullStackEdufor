import { Component, ElementRef, HostListener, inject, Output, EventEmitter, Input } from '@angular/core';
import { Book } from '../../services/book';
import { RouterLink, Router } from '@angular/router';
@Component({
  selector: 'app-book-info-form',
  imports: [],
  templateUrl: './book-info-form.html',
  styleUrl: './book-info-form.scss',
})
export class BookInfoForm {
  active: boolean = false
  bookService = inject(Book)
  @Output() ultimoLivroEncontrado = new EventEmitter<boolean>();
  @Input() book: any
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) {}

  deletarLivro() {
    this.delete.emit(this.book.id)
  }

  editarLivro() {
    this.edit.emit(this.book.id);
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
