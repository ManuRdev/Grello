const express = require('express');

module.exports = (server) => {
    const router = express.Router();

    router.post('/login',                                                //OK
        server.middlewares.bodyParser.json(),
        server.middlewares.ensureBodyFields(['email', 'password']),
        server.controllers.auth.login);

    return router;
};
