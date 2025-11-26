import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { DateTime } from 'luxon'
import { schema, rules } from '@adonisjs/validator'
import db from '@adonisjs/lucid/services/db'

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
                    rules.range(1, 2025)
                ]),
                genero: schema.string({}, [
                    rules.required()
                ]),
                isbn: schema.string({}, [
                    rules.required(),
                    rules.regex(/^\d{13}$/),
                    rules.minLength(13),
                    rules.maxLength(13)
                ])
    
            })
    
            const data = await request.validate({ 
                schema: bookSchema,
                messages: {
                    'titulo.required': 'O campo "título" é obrigatório.',
                    'autor.required': 'O campo "autor" é obrigatório.',
    
                    'ano_lancamento.required': 'O campo "ano de lançamento" é obrigatório.',
                    'ano_lancamento.range': 'O ano de lançamento deve estar entre 1 e 2025.',
    
                    'genero.required': 'O campo "gênero" é obrigatório.',
    
                    'isbn.required': 'O campo "isbn" é obrigatório.',
                    'isbn.regex': 'O ISBN deve conter exatamente 13 dígitos numéricos.',
                    'isbn.minLength': 'O ISBN deve conter exatamente 13 dígitos.',
                    'isbn.maxLength': 'O ISBN deve conter exatamente 13 dígitos.'
                }
             })

            // const existing = await Book.query()
            // .where('user_id', user.id)
            // .where('isbn', data.isbn)
            // .first()

            // if (existing) {
            //     existing.deletedAt = null
            //     existing.merge(data)
            //     await existing.save()

            //     return response.ok(existing)
            // }
    
        try {
            const newBook = await Book.create({
                userId: user.id,
                titulo: data.titulo,
                autor: data.autor,
                ano_lancamento: data.ano_lancamento,
                genero: data.genero,
                isbn: data.isbn
            })
    
            return response.created(newBook)
        } catch (error) {
            console.log('ERRO CAPTURADO')

            if (error.code === '23505') {
                return response.status(400).send({ message: 'Você já cadastrou um livro com esse ISBN.' })
            } 
            
            throw error
        }

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

    async indexPublic({ request }: HttpContext) {
        const { page = 1, limit = 10} = request.qs()

        const books = await Book.query()
        .whereNull('deleted_at')
        .select(
            db.rawQuery('MIN(id) AS id').knexQuery,
            'titulo',
            'autor',
            'ano_lancamento',
            'genero',
            'isbn'
        )
        .groupBy('titulo', 'autor', 'ano_lancamento', 'genero', 'isbn')
        .paginate(page, limit)

        return books
    }

    async showSingle({ auth, request }: HttpContext) {
        const { isbn } = request.qs()
        const user = auth.user!

        const books = await Book.query()
        .whereNull('deleted_at')
        .where('user_id', user.id)
        .whereRaw('CAST(isbn AS TEXT) ILIKE ?', [`%${isbn}%`])
        .first()

        return books
    }

    async showPublic({ request }: HttpContext) {
        const { query, type } = request.qs()
        const allowedFilters = ['titulo', 'autor', 'genero']

        const books = Book.query()
        .whereNull('deleted_at')
        .select('titulo', 'autor', 'genero', 'ano_lancamento', 'isbn')

        if (query) {
            if (!type || type === 'buscaEspecifica') {
                books.where((sub) => {
                    sub.whereILike('titulo', `%${query}%`)
                    .orWhereILike('autor', `%${query}%`)
                    .orWhereILike('genero', `%${query}%`)
                })
            } else if (allowedFilters.includes(type)) {
                books.whereILike(type, `%${query}%`)
            }
        }

        return await books
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