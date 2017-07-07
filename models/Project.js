const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = Schema({
    title: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref:'Task'
        }
    ]
});


module.exports = mongoose.model('Project', ProjectSchema);