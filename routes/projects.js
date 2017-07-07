const express = require('express');

module.exports = (server) => {
    const router = express.Router();

    router.get('/',
        server.controllers.projects.list);

    router.get('/id',
        server.middlewares.ensureAuthenticated,
        //TODO server.middlewares.ensureMember,
        server.controllers.projects.afficheProject);

    router.post('/',
        server.middlewares.ensureAuthenticated,
        //server.middlewares.ensureBodyFields(['title']),
        server.middlewares.bodyParser.json(),
        server.controllers.projects.create);

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.controllers.projects.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.controllers.projects.remove);


    return router;
};