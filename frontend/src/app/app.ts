import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Home } from "./components/home/home";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home],
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('frontend');
}
