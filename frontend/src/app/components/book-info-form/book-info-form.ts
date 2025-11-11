import { Component } from '@angular/core';

@Component({
  selector: 'app-book-info-form',
  imports: [],
  templateUrl: './book-info-form.html',
  styleUrl: './book-info-form.scss',
})
export class BookInfoForm {
  title = 'Titulo'
  autor = 'Autor'
  ano_lancamento = 2001
  genero = 'Suspense'
  isbn = 1231231231231
}
