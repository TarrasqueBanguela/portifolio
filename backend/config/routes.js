module.exports = app => {
    app.post('/signin', app.api.auth.signin)

    app.route('/window')
        .post(app.api.window.save)
        .get(app.api.window.get)

    app.route('/window/:id')
        .delete(app.api.window.remove)
    
    app.route('/users')
        .post(app.api.user.save)

    
    
}
