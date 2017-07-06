const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = Schema({
    title: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);