import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BookModel } from '../models/book-model';

@Injectable({
  providedIn: 'root',
})
export class Book {
  private url = environment.apiUrl
  selectedBook = signal<BookModel | null>(null)

  constructor(private http: HttpClient) {}

  adicionarLivro(data: {titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: number}): Observable<any> {
    return this.http.post(`${this.url}/livros/adicionar`, data)
  }

  editarLivro(bookId: number, data: {titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: number}): Observable<any> {
    return this.http.put(`${this.url}/livros/${bookId}/editar`, data)
  }

  deletarLivro(bookId: number): Observable<any> {
    return this.http.put(`${this.url}/livros/${bookId}/deletar`, { bookId })
  }

  exibirUltimoLivro(): Observable<any> {
    return this.http.get<BookModel[]>(`${this.url}/livros/ultimoLivro`)
  }

  exibirLivros(): Observable<any> {
    return this.http.get<BookModel[]>(`${this.url}/livros/exibirLivros`)
  }

  pesquisarLivro(valor: string) {
    return this.http.get<BookModel[]>(`${this.url}/livros/buscar`, {
      params: { query: valor }
    })
  }

  setBook(book: BookModel) {
    this.selectedBook.set(book)
  }
}

export interface Book {

}