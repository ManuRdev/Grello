const router = require('express').Router();
const bodyParser = require('body-parser');

module.exports = (server) => {
    router.get('/',
        server.controllers.tasks.list);

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['title', 'dueDate']),
        server.controllers.tasks.create);

    router.delete('/:id',
        server.controllers.tasks.remove);

    router.put('/:id',
        server.middlewares.bodyParser.json(),
        server.controllers.tasks.update);

    return router;
};