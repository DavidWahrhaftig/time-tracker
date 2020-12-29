const express = require('express');
const router = express.Router();

const Project = require('../../model/Project');
const Task = require('../../model/Task');


/**
 * @route GET api/tasks/
 * @desc Return all tasks
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        console.log("Get tasks");
        const tasks = await Task.find({});
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
        console.log('Get Task with ID', req.params.taskID);
        const task = await Task.findById(req.params.taskID);
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
 * @route POST api/tasks/
 * @desc Create new Task
 * @access Public
 */
router.post('/', async (req, res) => {
    try {
        console.log("Create task");
        // find project with the provided project Name
        const project = await Project.findOne({name: req.body.project.name}).populate('tasks');

        const newTask = await Task.create({...req.body, projectID: project._id});
        // add task in project tasks list
        project.tasks.push(newTask);
        project.save();

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

        await Task.findByIdAndUpdate(req.params.taskID, req.body);
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

        // delete task from project tasks list
        const project = await Project.findById(deletedTask.projectID);
        const index = project.tasks.indexOf(deletedTask._id);
        project.tasks.splice(index, 1);
        project.save();

        res.status(200).json({
            success: true,
            msg: `Deleted Task`
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
