import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { LoginPage } from './pages/auth/login-page/login-page';
import { UserBooks } from './pages/user-books/user-books';
import { Registro } from './pages/auth/registro/registro';
import { EditBookPage } from './pages/edit-book-page/edit-book-page';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
    {
        path: "home",
        component: Home
    },
    {
        path: "users/login",
        component: LoginPage
    },
    {
        path: "users/registro",
        component: Registro
    },
    {
        path: "users/books",
        component: UserBooks,
        canActivate: [authGuard]
    },
    {
        path: "books/edit",
        component: EditBookPage,
        canActivate: [authGuard]
    }
];
