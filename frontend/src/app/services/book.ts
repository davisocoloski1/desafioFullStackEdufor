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

  adicionarLivro(data: {titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: string}): Observable<any> {
    return this.http.post(`${this.url}/livros/adicionar`, data)
  }

  editarLivro(bookId: number, data: {titulo: string, autor: string, ano_lancamento: number, genero: string, isbn: string}): Observable<any> {
    return this.http.put(`${this.url}/livros/${bookId}/editar`, data)
  }

  deletarLivro(bookId: number): Observable<any> {
    return this.http.put(`${this.url}/livros/${bookId}/deletar`, { bookId })
  }

  
  exibirLivros(): Observable<any> {
    return this.http.get<BookModel[]>(`${this.url}/livros/exibirLivros`)
  }

  exibirPublicos(): Observable<any> {
    return this.http.get<BookModel[]>(`${this.url}/livros/livrosPublicos`)
  }

  pesquisarLivrosPublicos(valor: string, filtro: string): Observable<any> {
    return this.http.get<BookModel[]>(`${this.url}/livros/public`, {
      params: {
        query: valor,
        type: filtro
      }
    })
  }

  pesquisarLivro(valor: string) {
    return this.http.get<BookModel[]>(`${this.url}/livros/buscar`, {
      params: { query: valor }
    })
  }

  observarLivro(isbn: string) {
    return this.http.get(`${this.url}/livros/observarLivro`, {
      params: { isbn }
    })
  }

  setBook(book: BookModel) {
    this.selectedBook.set(book)
  }
}

export interface Book {

}