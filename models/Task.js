const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    title: {
        type: String,
        required: true
    },

    dueDate: {
        type: Date,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    assigned: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    project: {
        type: Schema.Types.ObjectId,
            ref: 'Project',
            required : true
    }
});

module.exports = mongoose.model('Task', TaskSchema);