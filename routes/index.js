module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use('/users',    require('./users')(server));
    server.use('/tasks',    require('./tasks')(server));
    server.use('/auth',     require('./auth')(server));
    server.use('/projects', require('./projects')(server));
};