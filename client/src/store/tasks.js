import axios from '../axios';
import moment from 'moment';

const state = {
    newTask: {
        name: "",
        start: null,
        end: null,
        project: {
            _id: null,
            name: "No Project"
        }
    }
}

const getters = {
    newTask(state) {
        return state.newTask;
    },
    tasks(state, getters) {
        // concatate all the tasks from every project
        const tasks = getters.projects.map(project => {
            return project.tasks.map(task => {
                const start = moment(task.start);
                const end = moment(task.end);
                const duration = moment.duration(moment(end).diff(start)).asSeconds();
                return {
                    taskID: task._id,
                    taskName: task.name,
                    project: project,
                    start,
                    end,
                    duration
                }
            }).reverse(); // reverse tasks from newest to oldest
        });

        // merge array of tasks arrays [ [task, task, ...], ... ]
        const mergedTasks = [].concat.apply([], tasks);    
        return mergedTasks;
    }
}

const mutations = {
    setNewTask(state, task) {
        state.newTask = {...state.newTask, ...task};
    },
    resetNewTask(state) {
        state.newTask= {
            name: "",
            start: null,
            end: null,
            project: {
                _id: null,
                name: "No Project"
            }
        }
    }
}

const actions = {
    async createTask({dispatch}, task) {
        try {
            await axios.post('/tasks', task);
            await dispatch('fetchProjects');
        } catch(err) {
            console.log(err);
        } 
    },
    async updateTask({dispatch}, payload) {
        try {
            await axios.put(`/tasks/${payload.taskID}`, payload.task);
            await dispatch('fetchProjects');
        } catch(err) {
            console.log(err);
        } 
    },
    async deleteTask({dispatch}, taskID) {
        try {
            await axios.delete(`/tasks/${taskID}`);
            await dispatch('fetchProjects');
        } catch(err) {
            console.log(err);
        } 
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}