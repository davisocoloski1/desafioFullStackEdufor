import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, Router } from "@angular/router";

@Component({
  selector: 'app-top-navbar',
  imports: [RouterLink],
  templateUrl: './top-navbar.html',
  styleUrl: './top-navbar.scss',
})
export class TopNavbar implements OnInit {
  router = inject(Router)

  ngOnInit(): void {
    this.checkLinks()
  }

  link1 = 'Login/Registro'
  link2 = 'Meus Livros'
  route1 = 'users/login'
  route2 = 'users/books'

  checkLinks() {
    if (this.router.url.startsWith("/users/login") || 
    this.router.url.startsWith("users/registro")) {
      this.link1 = 'Menu Principal'
      this.link2 = 'Meus Livros'
      this.route1 = ''
      this.route2 = '/users/books'
    } else if (this.router.url.startsWith("users/books")) {
      this.link1 = 'Menu Principal'
      this.link2 = 'Login/Registro'
      this.route1 = ''
      this.route2 = '/users/login'
    } else {
        this.link1 = 'Login/Registro'
        this.link2 = 'Meus Livros'
        this.route1 = '/users/login'
        this.route2 = '/users/books'
    }
  }
}
