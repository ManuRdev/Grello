const express = require('express');

module.exports = (server) => {
    const router = express.Router();

    router.get('/',
        server.controllers.projects.list);

    router.post('/',
        server.middlewares.ensureAuthenticated,
        server.middlewares.ensureRights(1),
        server.middlewares.bodyParser.json(),
        server.controllers.projects.create);

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.controllers.projects.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.controllers.projects.remove);

    router.post('/:id/invite/:userId',
        server.middlewares.ensureAuthenticated,
        server.controllers.projects.invite);

    router.post('/:id/kick/:userId',
        server.middlewares.ensureAuthenticated,
        server.controllers.projects.kick);

    return router;
};