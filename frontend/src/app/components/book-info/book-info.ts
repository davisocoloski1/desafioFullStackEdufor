import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-info',
  imports: [CommonModule, FormsModule],
  templateUrl: './book-info.html',
  styleUrl: './book-info.scss',
})
export class BookInfo {
  @Output() livroMudou = new EventEmitter<any>();

  livro = { titulo: '', autor: '', ano: '', genero: '', isbn: ''};

  atualizar() {
    this.livroMudou.emit(this.livro);
  }
}
