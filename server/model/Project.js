const mongoose = require('mongoose');

// Create the Project Schema
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    color: {
        type: String,
        // required: true,
        default: '#808080'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ],
});

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;