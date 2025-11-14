import { Component, inject } from '@angular/core';
import { TopNavbar } from "../../components/top-navbar/top-navbar";
import { BookEdit } from "../../components/book-edit/book-edit";
import { ShowBookInfo } from "../../components/show-book-info/show-book-info";
import { CommonModule } from '@angular/common';
import { Book } from '../../services/book';
import { BookModel } from '../../models/book-model';

@Component({
  selector: 'app-home',
  imports: [TopNavbar, BookEdit, ShowBookInfo, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  books: BookModel[] = []
  isEditing = false

  bookService = inject(Book)
  
  deletarLivro(id: number) {
    this.bookService.deletarLivro(id).subscribe({
      next: (res: any) => console.log(res),
      error: (err: any) => console.log(err.error)
    })
  }
  editarLivro(id: number) {
    // editar
  }
}
