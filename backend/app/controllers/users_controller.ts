import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"
import { schema, rules } from "@adonisjs/validator"

export default class UsersController {
    async login({request, response}: HttpContext) {
        const { email, password } = request.only(['email', 'password'])
        
        try {
            const user = await User.verifyCredentials(email, password)
            const token = await User.accessTokens.create(user)

            return response.ok({
                user,
                token: token.value!.release(),
            })
        } catch {
            return response.unauthorized({
                message: "Credenciais inválidas."
            })
        }
    }

    async logout({ auth, response }: HttpContext) {
        const user = auth.user

        if (!user) {
            return response.unauthorized({
                message: "Usuário não autenticado."
            })
        }

        const token = auth.user?.currentAccessToken
        if (token) {
            await User.accessTokens.delete(user, token.identifier)
        }

        return response.ok({
            message: "Logout realizado com sucesso."
        })
    }

    async store({ request, response }: HttpContext) {
        try {
            const userSchema = schema.create({
                username: schema.string({}, [
                    rules.minLength(3),
                    rules.maxLength(20),
                ]),
                email: schema.string({}, [rules.email()]),
                password: schema.string({}, [
                    rules.minLength(6),
                    rules.maxLength(20),
                ])
            })
    
            const data = await request.validate({ schema: userSchema })
            const user = await User.create(data)
    
            return response.created(user);
        } catch (error) {
            console.log('ERRO CAPTURADO')
            console.dir(error, { depth: null })

            if (error.code === '23505') {
                if (error.detail?.includes('email')) {
                    return response.status(400).send({ message: 'Este email já está em uso.' })
                } else if (error.detail?.includes('username')) {
                    return response.status(400).send({ message: 'Este username já está em uso.' })
                } else {
                    return response.status(400).send({ message: 'Usuário já existe.' })
                }
            }

            if (error.messages) {
                return response.status(422).send(error.messages)
            }

            return response.status(500).send({
                message: 'Erro interno do servidor',
                error: error.message,
            })
        }

    }
}