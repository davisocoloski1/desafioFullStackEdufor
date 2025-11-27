import { Component, inject, OnInit, Output, EventEmitter } from '@angular/core';
import { TopNavbar } from "../../components/top-navbar/top-navbar";
// import { BookEdit } from "../../components/book-edit/book-edit";
import { ShowBookInfo } from "../../components/show-book-info/show-book-info";
import { BookModel } from '../../models/book-model';
import { Book } from '../../services/book';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { PizzaGrapich } from "./pizza-grapich/pizza-grapich";
import { BarGrapich } from "./bar-graphic/bar-graphic";

@Component({
  selector: 'app-user-books',
  imports: [TopNavbar, ShowBookInfo, CommonModule, RouterLink, PizzaGrapich, BarGrapich],
  templateUrl: './user-books.html',
  styleUrl: './user-books.scss',
})
export class UserBooks implements OnInit {
  books: BookModel[] = []
  bookService = inject(Book)
  warnText = ''

  ngOnInit(): void {
    this.bookService.exibirLivros().subscribe({
      next: (res: any) => {
        this.books = res.data
        console.log(this.books)
      }
    })
  }

  deletarLivro(id: number) {
    this.bookService.deletarLivro(id).subscribe({
      next: (res: any) => {
        console.log(res)
        this.warnText = 'Livro deletado.'
        this.bookService.exibirLivros().subscribe({
          next: (res: any) => {
            this.books = res.data
            console.log(this.books)
          }
        })
      },
      error: (err: any) => console.log(err.error)
    })
  }
  editarLivro(id: number) {
    console.log(id)
  }
}
