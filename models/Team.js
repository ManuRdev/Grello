const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    }
});

module.exports = mongoose.model('Team', TeamSchema);