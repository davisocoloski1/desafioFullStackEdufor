import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"

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

    async store({ request }: HttpContext) {
        const { username, email, password } = request.all()
        const newUser = await User.create({
            username, email, password
        })

        return newUser;
    }
}