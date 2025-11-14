import { Component } from '@angular/core';
import { TopNavbar } from "../../components/top-navbar/top-navbar";
import { BookEdit } from "../../components/book-edit/book-edit";

@Component({
  selector: 'app-edit-book-page',
  imports: [TopNavbar, BookEdit],
  templateUrl: './edit-book-page.html',
  styleUrl: './edit-book-page.scss',
})
export class EditBookPage {

}
