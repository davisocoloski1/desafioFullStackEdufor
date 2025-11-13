import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router } from "@angular/router";
import { TopNavbar } from "../../../components/top-navbar/top-navbar";
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-login-page',
  imports: [RouterLink, TopNavbar, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrl: './login-page.scss',
})
export class LoginPage {
  auth = inject(Auth)
  router = inject(Router)

  emailPlaceholder = 'Email'
  passwordPlaceholder = 'Password'
  errorText = ''

  email = new FormControl('')
  password = new FormControl('')

  login() {
    this.auth.login(this.email.value ?? '', this.password.value ?? '').subscribe({
      next: (res: any) => {
        this.router.navigate(["/users/login"])
      }, error: (err: any) => {
        console.log(err.error)
        this.errorText = err.error?.message

        setTimeout(() => {
          this.errorText = ''
        }, 5000)
      }
    })
  }
}
