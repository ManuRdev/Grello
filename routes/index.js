module.exports = (server) => {
    server.use(server.middlewares.logger);
    server.use('/users',    require('./users')(server));
    server.use('/tasks/projects',    require('./tasks')(server));
    server.use('/auth',     require('./auth')(server));
    server.use('/projects', require('./projects')(server));
    server.use('/teams', require('./teams')(server));
};