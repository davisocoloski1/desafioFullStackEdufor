import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from "@angular/router";
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar implements OnInit {
  router = inject(Router)
  auth = inject(Auth)

  ngOnInit(): void {
    this.isLogged
    this.checkLinks()
  }

  get isLogged() {
    return !!localStorage.getItem('token')
  }

  link1 = 'Login/Registro'
  link2 = 'Meus Livros'
  route1 = 'users/login'
  route2 = 'users/books'

  logoutButton = 'Sair'

  checkLinks() {
    if (this.router.url.startsWith("/users/login") || 
    this.router.url.startsWith("users/registro")) {
      this.link1 = 'Menu Principal'
      this.link2 = 'Meus Livros'
      this.route1 = '/home'
      this.route2 = '/users/books'
    } else if (this.router.url.startsWith("/users/books")) {
      this.link1 = 'Menu Principal'
      this.link2 = 'Login/Registro'
      this.route1 = '/home'
      this.route2 = '/users/login'
    } else if (this.router.url.startsWith("/home")) {
      this.link1 = 'Meus Livros'
      this.link2 = 'Login/Registro'
      this.route1 = '/users/books'
      this.route2 = '/users/login'
    } else if (this.router.url.startsWith("/books")) {
      this.link1 = 'Menu Principal'
      this.link2 = 'Meus Livros'
      this.route1 = '/home'
      this.route2 = 'users/books'
    }
  }

  logout() {
    localStorage.removeItem('token')

    setTimeout(() => {
      window.location.reload()
    }, 2000)
  }
}
