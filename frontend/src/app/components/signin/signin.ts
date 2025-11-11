import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signin.html',
  styleUrl: './signin.scss',
})
export class Signin {
  http = inject(HttpClient)
  router = inject(Router)
  url = environment.apiUrl
  login = false
  mostrarSenha = false

  errorMsg = ''
  registerError = false

  usernameInput = new FormControl('')
  emailInput = new FormControl('')
  passwordInput = new FormControl('')
  passwordConfirmationInput = new FormControl('')

  registrarUser() {
    let username = this.usernameInput.value;
    let email = this.emailInput.value;
    let password = this.passwordInput.value?.trim();
    // let password_confirmation = this.passwordConfirmationInput.value?.trim();

    this.http.post(`${this.url}/usuarios/registros`, { username, email, password, password_confirmation: password }).subscribe({
      next: (res: any) => {
        this.router.navigate([""])
      }, error: (err) => {
        console.log(err)

        this.registerError = true
        if (err.error?.message) {
          this.errorMsg = err.error.message;
        } else {
          this.errorMsg = 'Erro ao tentar registrar usuário.'
        }

        setTimeout(() => {
          this.registerError = false
        }, 10000);
      }
    })
  }
}
