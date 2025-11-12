import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { DateTime } from 'luxon'
import { schema, rules } from '@adonisjs/validator'

export default class LivrosController {
    async store({ auth, request, response }: HttpContext) {
        const user = auth.user!
        
        const bookSchema = schema.create({
            titulo: schema.string({}, [
                rules.required()
            ]),
            autor: schema.string({}, [
                rules.required()
            ]),
            ano_lancamento: schema.number([
                rules.required(),
                rules.range(1000, 9999)
            ]),
            genero: schema.string({}, [
                rules.required()
            ]),
            isbn: schema.number([
                rules.required(),
                rules.range(1000000000000, 9999999999999),
                rules.unsigned()
            ])

        })

        const data = await request.validate({ schema: bookSchema })

        const newBook = await Book.create({
            userId: user.id,
            titulo: data.titulo,
            autor: data.autor,
            ano_lancamento: data.ano_lancamento,
            genero: data.genero,
            isbn: data.isbn
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

    async index({ request, auth }: HttpContext) {
        const user = auth.user!
        
        const { page = 1, limit = 10} = request.qs()
        const books = await Book.query()
        .where('user_id', user.id)
        .whereNull('deleted_at')
        .paginate(page, limit)

        return books
    }

    async showLast({ auth, response }: HttpContext) {
        try {
            const user = auth.user!
            
            const book = Book.query()
            .where('user_id', user.id)
            .whereNull('deleted_at')
            .orderBy('id', 'desc')
            .first()
            return book;
        } catch (error) {
            console.error('Erro ao buscar o livro: ', error.message)

            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.notFound({ message: 'Livro não encontrado' })
            }

            return response.internalServerError({
                message: 'Ocorreu um erro inesperado. Tente novamente mais tarde.'
            })
        }
        
    }

    async show({ request, auth }: HttpContext) {
        const user = auth.user!

        const { query } = request.qs()
        const books = await Book.query()
        .where('user_id', user.id)
        .whereNull('deleted_at')
        .andWhere((sub) => {
            if (query) {
                sub.whereLike('titulo', `%${query}%`)
                    .orWhereILike('autor', `%${query}%`)
                    .orWhereILike('genero', `%${query}%`)
            }
        })
        
        return books
    }

    async destroy({ params, response }: HttpContext) {
        try {
            const book = await Book.find(params.id)
    
            if (!book) {
                return response.notFound({ message: "Livro não encontrado" })
            }

            if (book.deletedAt) {
                return response.badRequest({ message: 'Este livro já foi deletado' })
            }
    
            book.deletedAt = DateTime.now()
            await book.save()
    
            return response.ok({ message: `O livro '${book.titulo}' foi deletado.` })
        } catch (error) {
            console.error('Erro ao deletar livro: ', error.message)

            if (error.code === 'E_ROW_NOT_FOUND') {
                return response.notFound({ message: 'Livro não encontrado.' })
            }

            return response.internalServerError({
                message: 'Ocorreu um erro ao tentar deletar o livro. Tente novamente mais tarde.'
            })
        }

    }
}