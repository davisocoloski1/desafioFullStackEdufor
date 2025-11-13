import { Component, inject } from '@angular/core';
import { TopNavbar } from "../../../components/top-navbar/top-navbar";
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { RouterLink, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-registro',
  imports: [TopNavbar, ReactiveFormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.scss',
})
export class Registro {
  auth = inject(Auth)
  router = inject(Router)
  url = environment.apiUrl

  emailPlaceholder = 'Email'
  passwordPlaceholder = 'Password'
  usernamePlaceholder = 'Nome de usuário'
  errorText = ''

  email = new FormControl('')
  password = new FormControl('')
  username = new FormControl('')

  registrar() {
    let passwordValue = this.password.value ?? ''
    let emailValue = this.email.value ?? ''
    let userValue = this.username.value ?? ''

    this.auth.registrar(emailValue, passwordValue, userValue).subscribe({
      next: (res: any) => {
        console.log(res)
        this.router.navigate(["/users/login"])
      }, error: (err: any) => {
        if (err.error.errors) {
          console.log(err.error.errors[0].message)
          this.errorText = err.error.errors[0].message
        } else if (err.error?.message) {
          console.log(err.error.message)
          this.errorText = err.error.message
        }
      }
    })
  }
}
