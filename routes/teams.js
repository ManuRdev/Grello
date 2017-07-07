
const express = require('express');

module.exports = (server) => {
    const router = express.Router();


    router.get('/',
        server.controllers.teams.list);

    router.get('/:id',
        //todo: server.middlewares.ensureMembres,
        server.middlewares.ensureAuthenticated,
        server.controllers.teams.listTeam);

    router.post('/',
        server.middlewares.ensureAuthenticated,
        //server.middlewares.ensureRights(1),
        server.middlewares.bodyParser.json(),
        server.controllers.teams.create);

    router.put('/:id',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.controllers.teams.update);

    router.delete('/:id',
        server.middlewares.ensureAuthenticated,
        server.controllers.teams.remove);

    router.post('/:id/invite/:userId',
        server.middlewares.ensureAuthenticated,
        server.controllers.teams.invite);

    router.post('/:id/kick/:userId',
        server.middlewares.ensureAuthenticated,
        server.controllers.teams.kick);

    return router;
};