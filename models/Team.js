const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TeamSchema = Schema({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    }
});

module.exports = mongoose.model('Team', TeamSchema);