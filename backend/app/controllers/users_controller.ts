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
                    rules.required()
                ]),
                email: schema.string({}, [
                    rules.email(),
                    rules.required()
                ]),
                password: schema.string({}, [
                    rules.minLength(6),
                    rules.maxLength(20),
                    rules.required()
                ])
            })
    
            const data = await request.validate({ 
                schema: userSchema,
                messages: {
                    'username.minLength': 'O nome de usuário deve ter no mínimo 3 caracteres',
                    'username.maxLength': 'O nome de usuário deve ter no máximo 20 caracteres',
                    'username.required': 'O campo "nome de usuário" é obrigatório.',

                    'email.email': 'O email informado não é válido.',
                    'email.required': 'O campo "email" é obrigatório.',

                    'password.minLength': 'A senha deve ter no mínimo 6 caracteres.',
                    'password.maxLength': 'A senha deve ter no máximo 20 caracteres.',
                    'password.required': 'O campo "senha" é obrigatório.'
                }
            })

            const user = await User.create(data)
    
            return response.created(user);
        } catch (error) {
            console.log('ERRO CAPTURADO')
            console.dir(error)

            if (error.code === '23505') {
                if (error.detail?.includes('email')) {
                    return response.status(400).send({ message: 'Este email já está em uso.' })
                } else if (error.detail?.includes('username')) {
                    return response.status(400).send({ message: 'Este username já está em uso.' })
                } else {
                    return response.status(400).send({ message: 'Usuário já existe.' })
                }
            }

            return response.badRequest(error.messages)
        }

    }
}