import type { HttpContext } from '@adonisjs/core/http'
import Book from '#models/book'
import { DateTime } from 'luxon'
import { schema, rules } from '@adonisjs/validator'

export default class LivrosController {
    async store({ auth, request, response }: HttpContext) {
        try {
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
                isbn: schema.number([
                    rules.required(),
                    rules.range(1000000000000, 9999999999999),
                    rules.unsigned()
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
                    'isbn.range': 'O ISBN deve ser um número de 13 dígitos.',
                    'isbn.unsigned': 'O ISBN deve ser um número positivo.'
                }
             })

            const existing = await Book.query()
            .where('user_id', user.id)
            .where('isbn', data.isbn)
            .first()

            if (existing) {
                existing.deletedAt = null
                existing.merge(data)
                await existing.save()

                return response.ok(existing)
            }
    
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
                return response.status(400).send({ message: 'Um livro com esse ISBN já foi cadastrado.'})
            } else return error
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

    async showPublic({ request }: HttpContext) {
        const { query } = request.qs()
        const books = await Book.query()
        .whereNull('deleted_at')
        .select('titulo', 'autor', 'ano_lancamento', 'genero', 'isbn')
        .if(query, (sub) => {
            sub.whereILike('titulo', `%${query}%`)
            .orWhereILike('autor', `%${query}%`)
            .orWhereILike('genero', `%${query}%`)
        })
        .groupBy('titulo', 'autor', 'genero', 'ano_lancamento', 'isbn')
        
        return books
        
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