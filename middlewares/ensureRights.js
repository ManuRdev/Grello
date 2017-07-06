module.exports = (requirements) => {

    return (req, res, next) => {
        if (typeof requirements === 'string')
            return req.token.role.title === requirements ? next() : res.status(403).send('not.enough.rights');

        if (requirements instanceof Array)
            return requirements.some(requirement => requirement === req.token.role.title) ? next() : res.status(403).send('not.enough.rights');

        if (req.token.role.level <= requirements)
            return next();

        return res.status(403).send('not.enough.rights');
    }
};