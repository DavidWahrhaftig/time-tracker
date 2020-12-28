const express = require('express');
const router = express.Router();

const Project = require('../../model/Project');

/**
 * @route GET api/projects/
 * @desc Return all projects
 * @access Public
 */
router.get('/', async (req, res) => {
    try {
        console.log("Get all tasks");
        const projects = await Project.find({}).populate({
            path : 'tasks',
            populate : {
              path : 'times'
            }
        });

        res.status(200).json({
            success: true,
            projects,
            msg: 'Get Projects'
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
 * @route GET api/projects/:projectID
 * @desc Return Project by id
 * @access Public
 */
router.get('/:projetID', async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectID).populate('tasks');
        
        res.status(200).json({
            success: true,
            project,
            msg: 'Get Project by ID'
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
 * @route POST api/projects/
 * @desc Create new Project
 * @access Public
 */
router.post('/', async (req, res) => {
    try {
        console.log("Create project");

        const newProject = await Project.create(req.body);

        res.status(201).json({
            success: true,
            project: newProject,
            msg: 'Created New Project'
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