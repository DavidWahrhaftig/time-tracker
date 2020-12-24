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
        // const tasks = await Task.find({}).populate('times');
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
        // const task = await Task.findById(req.params.taskID).populate('times');
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
 * @route GET api/tasks/name/:taskName
 * @desc Return All tasks with name taskName in project with projectID
 * @access Public
 */
router.get('/name/:taskName/project/:projectID', async (req, res) => {
    try {
        // const task = await Task.findOne({name: req.params.taskName, projectID: req.params.projectID}).populate('times');
        const tasks = await Task.find({name: req.params.taskName, projectID: req.params.projectID});
        res.status(200).json({
            success: true,
            tasks,
            msg: `Get Tasks with name ${req.params.taskName} and project id ${req.params.projectID}`
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
        // create new time
        // find project with the provided project Name
        let project = await Project.findOne({name: req.body.projectName}).populate('tasks');

        // create new project if projec not existing yet
        if (!project) {
            project = await Project.create({name: req.body.projectName});
        }

        // if (req.body.projectID) {
        //     project = await Project.findOne({name: req.body.projectName}).populate('tasks');
        // } else {
        //     project = await Project.findOne({name: 'No Project'}).populate('tasks');
        // }

        const newTask = await Task.create({...req.body, projectID: project._id});
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
        // delete all time documents of this task
        // await Time.deleteMany({_id: {$in: deletedTask.times}});
        // delete task from project document
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
