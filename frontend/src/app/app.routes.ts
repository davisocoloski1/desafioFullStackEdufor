import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { BooksPublic } from './components/books-public/books-public';
import { Signin } from './components/signin/signin';

export const routes: Routes = [
    {
        path: "",
        component: Home
    },
    {
        path: "login",
        component: Login
    },
    {
        path: "public_books",
        component: BooksPublic
    },
    {
        path: "signin",
        component: Signin
    }
];
