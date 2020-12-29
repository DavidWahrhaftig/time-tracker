import axios from '../axios';
import moment from 'moment';

const state = {
    projects: []
}

const getters = {
    projects(state) {
        return state.projects;
    },
    sortedProjects(state) { // sorted by total duration
        return state.projects.sort((p1, p2) => {
            if ( p1.totalDuration > p2.totalDuration ){
                return -1;
            }
            if ( p1.totalDuration < p2.totalDuration) {
                return 1;
            }
            return 0;
        })
    }
}

const mutations = {
    setProjects(state, projects) {
        const updatedProjects = projects.map(project => {
            // accumlate the task durations from all tasks
            const totalDuration = project.tasks.reduce((sumTasks, task) => {
                const start = moment(task.start);
                const end = moment(task.end);
                const diff = moment.duration(end.diff(start));
                const seconds = diff.asSeconds();
                return isNaN(seconds) ? sumTasks : sumTasks + seconds;
            }, 0);
            // sort tasks by start date
            const sortedTasks = project.tasks.sort((t1, t2) => {
                if ( moment(t1.start).diff(moment(t2.start), 'seconds') < 0 ){
                    return -1;
                }
                if ( moment(t1.start).diff(moment(t2.start), 'seconds') > 0) {
                    return 1;
                }
                return 0;
            });

            return {
                ...project,
                totalDuration,
                tasks: [...sortedTasks]
            }
        })
        state.projects = updatedProjects;
    },
}

const actions = {
    async fetchProjects({commit}) {
        try {
            const res = await axios.get('/projects');
            if (res.data.success) {
                commit('setProjects', res.data.projects);
            }
        } catch(err) {
            console.log(err);
        } 
    },
    async createProject({dispatch}, project) {
        try {
            const res = await axios.post('/projects', project);
            if (res.data.success) {
                await dispatch('fetchProjects');
                return true;
            }
            return false;
        } catch(err) {
            console.log(err);
            return false;
        } 
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}