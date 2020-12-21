import axios from '../axios';
// import router from '../router';
import moment from 'moment';

const state = {
    projects: []
}

const getters = {
    projects(state) {
        return state.projects;
    },
    sortedProjects(state) {
        return state.projects.sort((p1, p2) => {
            if ( p1.totalDuration > p2.totalDuration ){
                return -1;
              }
              if ( p1.totalDuration < p2.totalDuration) {
                return 1;
              }
              return 0;
        })
    },
    tasks(state) {
        // concatate all the tasks from every project
        const tasks = state.projects.map(project => {
            return project.tasks.map(task => {
                return task.times.map((time) => {
                    return {
                        taskID: task._id,
                        taskName: task.name,
                        projectID: project._id,
                        projectName: project.name,
                        timeID: time._id,
                        start: moment(time.start),
                        end: moment(time.end),
                        duration: moment.duration(moment(time.end).diff(time.start))
                    }
                });
            })
        })

        const merged = [].concat.apply([], [].concat.apply([], tasks));
        // .reduce((arr, tasks) => {
        //     console.log("taasksssss",tasks);
        //     arr = [...arr, ...tasks];
        // }, []);

        return merged;
    },
}

const mutations = {
    setProjects(state, projects) {
        const updatedProjects = projects.map(p => {
            console.log("p.tasks", p.tasks);
            const totalDuration = p.tasks.reduce((sumTasks, task) => {
                console.log("sumTasks", sumTasks);
                const taskTotalDuration = task.times.reduce((sumTimes, time) => {
                // task.times.reduce((sumTimes, time) => {
                    console.log("start", moment(time.start));
                    console.log("end", moment(time.end));
                    const start = moment(time.start)
                    const end = moment(time.end)
                    const diff = moment.duration(end.diff(start));
                    const seconds = diff.asSeconds();
                    console.log("seconds",seconds);
                    return sumTimes + seconds;
                }, 0);
                return sumTasks + taskTotalDuration;
            }, 0);
            console.log("total duration as seconds", totalDuration);
            console.log("total duration as hours", totalDuration/(60*60));
            // var x = 43000
            const durationValue = moment.duration(totalDuration*1000, 'milliseconds');
            const hours = Math.floor(durationValue.asHours());
            const mins = Math.floor(durationValue.asMinutes()) - hours * 60;
            const sec = Math.floor(durationValue.asSeconds()) - hours * 60 * 60 - mins * 60;
            console.log("hh:" + hours + "mm:" + mins + "ss" + sec);
            return {
                ...p,
                totalDuration
            }
        })
        state.projects = updatedProjects;
    },
}

const actions = {
    async fetchProjects({commit}) {
        try {
            // commit('setIsLoading', true);
            const res = await axios.get('/projects');
            if (res.data.success) {
                commit('setProjects', res.data.projects);
            }
            // commit('setIsLoading', false);
        } catch(err) {
            console.log(err);
            // commit('setIsLoading', false);
        } 
    },
    async createProject({dispatch}, project) {
        try {
            // commit('setIsLoading', true);
            const res = await axios.post('/projects', project);
            if (res.data.success) {
                // commit('setTasks', res.data.tasks);
                await dispatch('fetchProjects');
            }
            // commit('setIsLoading', false);
        } catch(err) {
            console.log(err);
            // commit('setIsLoading', false);
        } 
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}