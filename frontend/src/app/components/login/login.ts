import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-login',
  imports: [RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  textButton = "Entrar"
  textButton2 = "Registrar Conta"
  registro = true

  alternarLogin() {
    this.registro = !this.registro

    if (!this.registro) {
      this.textButton2 = "Entrar em uma conta"
      this.textButton = "Registrar"
    } else {
      this.textButton2 = "Registrar conta"
      this.textButton = "Entrar"
    }
  }
}
