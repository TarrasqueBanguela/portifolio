const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {
    const signin = async (req, res) => {

        const LoginPassword = req.body.password
        const LoginEmail = req.body.email

        if (!LoginEmail || !LoginPassword) {
            return res.status(400).send('Informe usuário e senha!')
        }

        const user = await app.db('users')
            .where({ email: LoginEmail })
            .first()
        if (!user) return res.status(500).send('Usuário não encontrado!')

        const UserPassword = user.password

        const checkPassword = (password) => bcrypt.compareSync(password, UserPassword);

        checkPassword(LoginPassword)

        const now = Math.floor(Date.now() / 1000)

        const payLoad = {
            id: user.id,
            name: user.name,
            email: user.email,
            admin: user.admin,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payLoad,
            token: jwt.encode(payLoad, authSecret)
        })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {
            // problema com o token
        }

        res.send(false)
    }

    return { signin, validateToken }
}