const router = require('express').Router();
const bodyParser = require('body-parser');

module.exports = (server) => {
    router.get('/',
        server.middlewares.ensureAuthenticated,
        server.controllers.tasks.list);

    router.get('/:idProject/:idTask',
        server.middlewares.ensureAuthenticated,
        server.controllers.tasks.infoTask);

    router.post('/:idProject',
        server.middlewares.ensureAuthenticated,
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['title', 'dueDate']),
        server.controllers.tasks.create);

    router.delete('/:idProject/delete/:idTask',
        server.middlewares.ensureAuthenticated,
        //TODO server.middlewares.ensureCreatorAssignedOrAdmin,
        server.controllers.tasks.remove);

    router.put('/:idProject/update/:idTask',
        server.middlewares.ensureAuthenticated,
        //TODO server.middlewares.ensureCreatorAssignedOrAdmin,
        server.middlewares.bodyParser.json(),
        server.controllers.tasks.update);

    router.put('/:idProject/assign/:idTask/:idUser',
        server.middlewares.ensureAuthenticated,
        //TODO server.middlewares.ensureCreatorAssignedOrAdmin,
        server.middlewares.bodyParser.json(),
        server.controllers.tasks.assign);

    return router;
};