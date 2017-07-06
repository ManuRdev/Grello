const router = require('express').Router();

module.exports = (server) => {
    router.get('/',
        server.controllers.persons.list);

    router.post('/',
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email', 'password']),
        server.controllers.persons.create);

    router.delete('/:id',
        server.controllers.persons.remove);

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.controllers.persons.update);

    return router;
};