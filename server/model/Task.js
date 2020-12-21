const mongoose = require('mongoose');

// Create the Task Schema
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true 
    },
    projectID: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Project',
        required: false
    },
    // times: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "Time"
    //     }
    // ],
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        default: null
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;