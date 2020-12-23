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
        type: String, // YY-MM-DD HH:mm:ss
        required: true
    },
    end: {
        type: String, // YY-MM-DD HH:mm:ss
        default: null
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;