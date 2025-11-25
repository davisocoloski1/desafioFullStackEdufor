import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  imports: [],
  templateUrl: './load.html',
  styleUrl: './load.scss',
})
export class Load implements OnInit {
  router = inject(Router)

  ngOnInit(): void {
    localStorage.removeItem('token')

    setTimeout(() => {
      this.router.navigate(["home"])
    }, 1000)
  }
}
