import { Component, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-book',
  imports: [ReactiveFormsModule],
  templateUrl: './search-book.html',
  styleUrl: './search-book.scss',
})
export class SearchBook {
  @Output() searchValue = new EventEmitter<string>();
  
  searchBarPlaceholder = 'Buscar por título, autor, gênero...'
  searchBar = new FormControl('')

  emitirLivro() {
    if (!this.searchBar.value?.trim()) {
      this.searchBarPlaceholder = 'Nada para pesquisar...'

      setTimeout(() => {
        this.searchBarPlaceholder = 'Buscar por título, autor, gênero...'
      }, 5000)

      return
    } 
    
    this.searchValue.emit(this.searchBar.value)
  }
}
