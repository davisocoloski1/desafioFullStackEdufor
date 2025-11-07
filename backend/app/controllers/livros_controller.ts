import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { DateTime } from 'luxon'

export default class LivrosController {
    async store({ auth, request, response }: HttpContext) {
        const user = auth.user!
        
        const { titulo, autor, ano_lancamento, genero, isbn } = request.all()

        const existingBook = await Book.query()
        .where('user_id', user.id)
        .andWhere('isbn', isbn)
        .first()

        if (existingBook) {
            return response.conflict({
                message: `Você já resgistrou um livro com o ISBN ${isbn}`
            })
        }
        
        const newBook = await Book.create({
            userId: user.id,
            titulo, autor, ano_lancamento, genero, isbn,
        })

        return response.created(newBook)
    }

    async update({ params, request, response }: HttpContext) {
        const book = await Book.find(params.id)

        if (!book) {
            return response.notFound({
                message: "Livro não encontrado."
            })
        }

        const data = request.only([
            'titulo', 'autor', 'ano_lancamento', 'genero', 'isbn'
        ])

        book.merge(data)
        await book.save()

        return response.ok(book)
    }

    async destroy({ params, response }: HttpContext) {
        const book = await Book.find(params.id)

        if (!book) {
            return response.notFound({ message: "Livro não encontrado" })
        }

        book.deletedAt = DateTime.now()
        await book.save()

        return response.ok({ message: `O livro '${book.titulo}' foi deletado.` })
    }
}