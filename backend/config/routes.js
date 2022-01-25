module.exports = app => {
    app.route('/window')
        .post(app.api.window.save)
        .get(app.api.window.get)

        app.route('/window/:id')
        .delete(app.api.window.remove)
}
