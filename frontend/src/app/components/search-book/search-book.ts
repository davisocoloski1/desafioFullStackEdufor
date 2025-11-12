import { Component, Output, EventEmitter, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-book',
  imports: [ReactiveFormsModule],
  templateUrl: './search-book.html',
  styleUrl: './search-book.scss',
})
export class SearchBook {
  @Output() buscarLivro = new EventEmitter<string>();

  searchInput = new FormControl('')
  searchPlaceholder = 'Buscar por título, autor, gênero...'

  enviarLivro() {
    let searchValue = this.searchInput.value ?? ''

    if (!searchValue.trim()) {
      this.searchPlaceholder = 'Nada para pesquisar...'
      setTimeout(() => {
        this.searchPlaceholder = 'Buscar por título, autor, gênero...'
      }, 5000)
    } else {
      this.buscarLivro.emit(searchValue)
    }
  }
}
