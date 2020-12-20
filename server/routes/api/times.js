const express = require('express');
const router = express.Router();

const Task = require('../../model/Task');
const Time = require('../../model/Time');

/**
 * @route GET api/times/:timeID
 * @desc Return Time by id
 * @access Public
 */
router.get('/:timeID', async (req, res) => {
    try {
        const time = await Time.findById(req.params.timeID);
        res.status(200).json({
            success: true,
            time,
            msg: 'Get Time'
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            success: false,
            msg: err.message
        });
    }
});

/**
 * @route POST api/times/
 * @desc Create new Time
 * @access Public
 */
router.post('/', async (req, res) => {
    try {
        console.log("Create time");
        
        // create new time
        const newTime = await Time.create({start: new Date(), taskID: req.body.taskID});
       
        // add new time to the task times
        const task = await Task.findById(req.body.taskID).populate('times');
        task.times.push(newTime);
        task.save();
        
        res.status(201).json({
            success: true,
            time: newTime,
            msg: 'Created New Time'
        });

    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            success: false,
            msg: err.message
        });
    }
});


/**
 * @route PUT api/times/:timeID
 * @desc Update Time
 * @access Public
 */
router.put('/:timeID', async (req, res) => {
    try {
        console.log("Update time");
        // create new time
        // update time document 
        // const time = await Time.findByIdAndUpdate(req.params.timeID, {start: req.body.start, end: req.body.end});
        // const time = await Time.findByIdAndUpdate(req.params.timeID, {...req.body});
        const time = await Time.findByIdAndUpdate(req.params.timeID, {end: new Date()});
        // res.redirect('/api/tasks/'+ req.body.taskID);
        res.status(200).json({
            success: true,
            time,
            msg: 'Updated Time'
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            success: false,
            msg: err.message
        });
    }
});


/**
 * @route Delete api/times/:timeID
 * @desc Delete time
 * @access Public
 */
router.delete('/:timeID', async (req, res) => {
    try {
        console.log("Delete time");
        // delete time document 
        const deletedTime = await Time.findByIdAndDelete(req.params.timeID);
    
        const task = await Task.findById(deletedTime.taskID);
        const index = task.times.indexOf(req.params.timeID);
        task.times.splice(index, 1);
        task.save();

        res.status(200).json({
            success: true,
            msg: 'Deleted Time'
        });
    } catch (err) {
        console.log(err.message);
        res.status(404).json({
            success: false,
            msg: err.message
        });
    }
});




module.exports = router;