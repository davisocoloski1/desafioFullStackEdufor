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
        const userSchema = schema.create({
            username: schema.string({}, [
                rules.minLength(3),
                rules.maxLength(20),
            ]),
            email: schema.string({}, [rules.email()]),
            password: schema.string({}, [
                rules.minLength(6),
                rules.maxLength(20),
                rules.confirmed(),
            ])
        })

        const data = await request.validate({ schema: userSchema })
        const user = await User.create(data)

        return response.created(user);
    }
}