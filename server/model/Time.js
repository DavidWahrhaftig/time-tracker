const mongoose = require('mongoose');

// Create the Time Schema
const TimeSchema = new mongoose.Schema({
    start: {
        type: Date,
        required: true 
    },
    end: {
        type: Date,
        default: null,
        required: false
    },
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task"
    }
});

const Time = mongoose.model('Time', TimeSchema);

module.exports = Time;