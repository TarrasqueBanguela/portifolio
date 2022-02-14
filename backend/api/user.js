const bcrypt = require('bcrypt')

module.exports = app => {
    const { existsOrError, NotExistsOrError } = app.api.validation

    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)


    const createPassword = password => {
        return bcrypt.hashSync(password, salt)
    }

    const save = async (req, res) => {
        const user = { ...req.body }

        try {
            
            existsOrError(user.name, "Nome não informado.")
            existsOrError(user.email, "email não informado.")
            existsOrError(user.password, "senha não informada.")

        } catch(msg) {
            return res.status(400).send(msg)
        }

        user.password = createPassword(user.password)

        if(!user.id){
            app.db('users')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    return { save }
}