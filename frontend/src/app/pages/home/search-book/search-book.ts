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
  @Output() filtroValue = new EventEmitter<string>();
  
  searchBarPlaceholder = 'Buscar por título, autor, gênero...'

  buscaFiltrada = false
  searchBar = new FormControl('')
  filtroBar = new FormControl('')

  emitirLivro() {
    const valorBusca = this.searchBar.value?.trim()

    if (!valorBusca) {
      this.searchBarPlaceholder = 'Nada para pesquisar...'
      setTimeout(() => {
        this.searchBarPlaceholder = 'Buscar por título, autor, gênero...'
      }, 3000)
      return
    }

    this.searchValue.emit(valorBusca)
  }

  checarFiltros() {
    const filtro = this.filtroBar.value

    if (filtro === 'titulo') {
      this.filtroValue.emit('titulo')
      this.searchBarPlaceholder = 'Digite o título do livro'
      this.buscaFiltrada = false
    } else if (filtro === 'autor') {
      this.filtroValue.emit('autor')
      this.searchBarPlaceholder = 'Digite o nome do autor'
      this.buscaFiltrada = false
    } else if (filtro === 'genero') {
      this.filtroValue.emit('genero')
      this.searchBarPlaceholder = 'Digite o gênero do livro'
      this.buscaFiltrada = false
    } else if (filtro === '') {
      this.filtroValue.emit('')
      this.searchBarPlaceholder = 'Buscar por título, autor, gênero...'
      this.buscaFiltrada = false
    }
  }

}
