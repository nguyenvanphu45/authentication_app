const usersRoute = require('./users');
const authRoute = require('./auth');
const groupRoute = require('./group');
const chatRoute = require('./chat');

function route(app) {
    app.use('/users', usersRoute);
    app.use('/auth', authRoute);
    app.use('/group', groupRoute);
    app.use('/chat', chatRoute);

    app.use('/', (req, res) => res.send('API not available!!'));
}

module.exports = route;
