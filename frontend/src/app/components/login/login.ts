import { Component, inject } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { HttpClient } from '@angular/common/http';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  http = inject(HttpClient)
  router = inject(Router)
  login = false
  mostrarSenha = false
  url = environment.apiUrl

  usernameInput = new FormControl('')
  emailInput = new FormControl('')
  passwordInput = new FormControl('')

  textButton = "Entrar"
  textButton2 = "Entrar em uma conta"
  errorMsg = ''
  loginError = false
  registro = true

  alternarLogin() {
    
    if (!this.registro) {
      this.textButton2 = "Entrar em uma conta"
      this.textButton = "Registrar"
    } else {
      this.textButton2 = "Registrar conta"
      this.textButton = "Entrar"
    }
    this.registro = !this.registro
  }

  validarUser() {
    let email = this.emailInput.value;
    let password = this.passwordInput.value;

    this.http.post(`${this.url}/usuarios/login`, { email, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        console.log(res.token)
        this.login = true

        setTimeout(() => {
          this.router.navigate([""])
        }, 2000)

      },
      error: (err) => {
        this.loginError = true
        if (err.status === 401 && err.error?.message) {
          this.errorMsg = err.error.message
        } else {
          this.errorMsg = 'Erro ao tentar fazer login'
        }

        setTimeout(() => {
          this.loginError = false
        }, 10000)
      }
    })
  }
}
