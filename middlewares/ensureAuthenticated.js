const jwt = require('jsonwebtoken');

module.exports = (server) => {
    return (req, res, next) => {
        const encryptedToken = req.header('Authorization');

        if (!encryptedToken)
            return res.status(401).send('unauthorized');

        jwt.verify(encryptedToken, server.config.salt, (err, token) => {
            if (err)
                return res.status(401).send(err);

            req.token = token;
            next();
        });
    };
};


