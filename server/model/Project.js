const mongoose = require('mongoose');

// Create the Project Schema
const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    createdAt: {
        type: Date,
        required: true
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