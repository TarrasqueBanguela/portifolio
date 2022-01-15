module.exports = app => {
    app.route('/home')
        .post(app.api.window.save)
}