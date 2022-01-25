
module.exports = app => {
    const { existsOrError } = app.api.validation

    const save = (req, res) => {
        const window = { ...req.body }
        if (req.params.id) window.id = req.params.id 

        try {
            existsOrError(window.name.length, 'Nome Não Informado!')
            existsOrError(window.imgScr.length, 'Imagem Não Informada!')
            existsOrError(window.link.length, 'Link Não Informado!')
            existsOrError(window.content.length, 'Descrição Não Informada!')
        } catch(msg) { res.status(400).send(msg) }

        if(window.id) {
            app.db('windows')
                .update(window)
                .where({ id: window.id })
                .then(_ => res.status(204).send())
                .catch(msg => res.status(500).send(msg))
        } else {
            app.db('windows')
                .insert(window)
                .then(_ => res.status(204).send())
                .catch(msg => res.status(500).send(msg))
        }
        
    }

    const remove = async (req, res) => {
        try {
            const rowsDeleted = await app.db('windows')
                .where({ id: req.params.id }).del()
            try {
                existsOrError(rowsDeleted, 'Artigo não foi encontrado.')
            } catch(msg) {
                return res.status(400).send(msg)    
            }

            res.status(204).send()
        } catch(msg) {
            res.status(500).send(msg)
        }
    }

    const get = (req, res) => {
        app.db('windows')
            .then(categories => res.json(categories))
            .catch(err => res.status(500).send(err))
    }

    return { save, remove, get }
}