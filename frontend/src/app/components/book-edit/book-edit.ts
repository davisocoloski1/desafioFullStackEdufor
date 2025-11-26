import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Book } from '../../services/book';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-book-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './book-edit.html',
  styleUrl: './book-edit.scss',
})
export class BookEdit implements OnInit {
  bookService = inject(Book);
  router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  book = this.bookService.selectedBook();

  titulo = new FormControl('');
  autor = new FormControl('');
  ano = new FormControl('');
  genero = new FormControl('');
  isbn = new FormControl('');

  successText = '';
  errorText = '';
  actionButton = 'Adicionar';

  ngOnInit(): void {
    const isEdit = this.router.url.includes('/edit');
    this.actionButton = isEdit ? 'Editar' : 'Adicionar';

    if (isEdit && this.book) {
      this.titulo.setValue(this.book.titulo ?? '');
      this.autor.setValue(this.book.autor ?? '');
      this.ano.setValue(String(this.book.anoLancamento ?? ''));
      this.genero.setValue(this.book.genero ?? '');
      this.isbn.setValue(String(this.book.isbn ?? ''));
      this.isbn.disable();
    }
  }

  limpar() {
    this.titulo.setValue('');
    this.autor.setValue('');
    this.ano.setValue('');
    this.genero.setValue('');
    this.isbn.setValue('');
    this.errorText = '';
    this.successText = '';
  }

  enviarLivro() {
    this.errorText = '';
    this.successText = '';

    if (!this.titulo.value?.trim()) return this.setError('O campo "Título" é obrigatório');
    if (!this.autor.value?.trim()) return this.setError('O campo "Autor" é obrigatório');
    if (!this.ano.value?.trim()) return this.setError('O campo "Ano de Lançamento" é obrigatório');
    if (!this.genero.value?.trim()) return this.setError('O campo "Gênero" é obrigatório');
    if (!this.isbn.value?.trim()) return this.setError('O campo "ISBN" é obrigatório');

    const dados = {
      titulo: this.titulo.value!.trim(),
      autor: this.autor.value!.trim(),
      ano_lancamento: Number(this.ano.value!),
      genero: this.genero.value!.trim(),
      isbn: this.isbn.value!.trim(),
    };

    if (this.router.url.includes('/add')) {
      this.criarLivro(dados);
    } else if (this.router.url.includes('/edit') && this.book?.id) {
      this.editarLivro(this.book.id, dados);
    }
  }

  private setError(mensagem: string) {
    this.errorText = mensagem;
    this.cdr.detectChanges();
  }

  criarLivro(dados: any) {
    this.bookService.adicionarLivro(dados).subscribe({
      next: (res: any) => {
        if (res.messages?.errors?.length > 0) {
          console.log(res)
          this.successText = ''
          this.errorText = res.messages.errors[0].message;
          return
        }
        this.successText = 'Livro adicionado com sucesso! Volte ao Menu Principal ou clique em "Meus Livros" para vê-lo.';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.log(err)
        let mensagem = 'Erro inesperado ao adicionar livro.';

        this.setError(err.error.errors[0].message);
      }
    });
  }

  editarLivro(id: number, dados: any) {
    this.bookService.editarLivro(id, dados).subscribe({
      next: () => {
        this.successText = 'Livro atualizado com sucesso!';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.setError(err.error?.message || 'Erro ao editar livro.');
      }
    });
  }
}