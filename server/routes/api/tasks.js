const express = require('express');
const router = express.Router();

const Project = require('../../model/Project');
const Task = require('../../model/Task');
const Time = require('../../model/Time');

/**
 * @route GET api/tasks/
 * @desc Return all tasks
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        console.log("Get all tasks");
        const tasks = await Task.find({}).populate('times');
        res.status(200).json({
            success: true,
            tasks,
            msg: 'Get Tasks'
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
 * @route GET api/tasks/:taskID
 * @desc Return Task by id
 * @access Public
 */
router.get('/:taskID', async (req, res) => {
    try {
        const task = await Task.findById(req.params.taskID).populate('times');
        res.status(200).json({
            success: true,
            task,
            msg: 'Get Task'
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
 * @route GET api/tasks/name/:taskName
 * @desc Return Task by id
 * @access Public
 */
router.get('/name/:taskName/project/:projectID', async (req, res) => {
    try {
        const task = await Task.findOne({name: req.params.taskName, projectID: req.params.projectID}).populate('times');
        res.status(200).json({
            success: true,
            task,
            msg: 'Get Task by task name and project id'
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
 * @route POST api/tasks/
 * @desc Create new Task and Time
 * @access Public
 */
router.post('/', async (req, res) => {
    try {
        console.log("Create task and time");
        // create new time

        const newTask = await Task.create({name: req.body.name, projectID: req.body.projectID});
        if (req.body.projectID) {
            const project = await Project.findById(req.body.projectID).populate('tasks');
            project.tasks.push(newTask);
            project.save();
        }
        res.status(201).json({
            success: true,
            task: newTask,
            msg: 'Created New Task'
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
 * @route PUT api/tasks/:taskID
 * @desc Update Task name
 * @access Public
 */
router.put('/:taskID', async (req, res) => {
    try {
        console.log("Update Task");

        const otherTask = await Task.findOne({ name: req.body.newName, projectID: req.body.projectID });
        // check if task new name exists for the same project then copy time references to existing task
        if (otherTask) {
            const task = await Task.findById(req.params.taskID);
            // otherTask.times.concat(task.times);
            otherTask.times = [...otherTask.times, ...task.times];
            otherTask.save();
            const deletedTask = await Task.findByIdAndDelete(task._id);
            // update the taskId in every time document that had the previous task id
            await Time.updateMany({taskID: deletedTask._id},{taskID: otherTask._id});

            // remove deleted task from the project tasks
            const project = await Project.findById(deletedTask.projectID);
            const index = project.tasks.indexOf(deletedTask._id);
            project.tasks.splice(index, 1);
            project.save();
        } else {// else  rename name field of task
            const task = await Task.findByIdAndUpdate(req.params.taskID, {name: req.body.newName});
            task.name = req.body.newName;
            task.save();
        }
        res.status(200).json({
            success: true,
            msg: 'Updated Task'
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
 * @route Delete api/taskID/
 * @desc Delete Task
 * @access Public
 */
router.delete('/:taskID', async(req, res) => {
    try {
        // delete task document
        const deletedTask = await Task.findByIdAndDelete(req.params.taskID);
        // delete all time documents of this task
        await Time.deleteMany({_id: {$in: deletedTask.times}});
        // delete task from project document
        const project = await Project.findById(deletedTask.projectID);
        const index = project.tasks.indexOf(deletedTask._id);
        project.tasks.splice(index, 1);
        project.save();

        res.status(200).json({
            success: true,
            msg: 'Deleted Task'
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
