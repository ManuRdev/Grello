const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/al-janv-db');
mongoose.Promise = require('bluebird');

module.exports = (server) => {
    server.models = {
        User: require('./User'),
        Task: require('./Task'),
        Project: require('./Project'),
        Role: require('./Role'),
        Team: require('./Team')
    };
};