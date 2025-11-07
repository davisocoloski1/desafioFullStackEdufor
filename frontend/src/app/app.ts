import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SearchBar } from "./components/search-bar/search-bar";
import { AddBook } from "./components/add-book/add-book";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SearchBar, AddBook],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('angular20Tutorial');
}
