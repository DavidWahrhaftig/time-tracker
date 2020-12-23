import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from '../axios';
// import Tasks from './tasks';
// import Projects from './projects';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: [],
        tasks: [],
        newTask: {
            name: "",
            start: null,
            end: null,
            projectID: null,
            projectName: "No Project"
        }
    },
    getters: {
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
                    const start = moment(task.start);
                    const end = moment(task.end);
                    const duration = moment.duration(moment(end).diff(start)).asSeconds();
                    return {
                        taskID: task._id,
                        taskName: task.name,
                        projectID: project._id,
                        projectName: project.name,
                        start,
                        end,
                        duration
                    }
                }).reverse();
                // });
            });
    
            const merged = [].concat.apply([], [].concat.apply([], tasks));    
            return merged;
        },
        newTask(state) {
            return state.newTask;
        }
    },
    mutations: {
        setProjects(state, projects) {
            const updatedProjects = projects.map(project => {
                // console.log("project.tasks", project.tasks);
                const totalDuration = project.tasks.reduce((sumTasks, task) => {
                    // console.log("sumTasks", sumTasks);
                    const start = moment(task.start)
                    const end = moment(task.end)
                    const diff = moment.duration(end.diff(start));
                    const seconds = diff.asSeconds();
                    // console.log("seconds",seconds);
                    return isNaN(seconds) ? sumTasks : sumTasks + seconds;
                }, 0);
                // console.log("total duration as seconds", totalDuration);
                // console.log("total duration as hours", totalDuration/(60*60));
                // const durationValue = moment.duration(totalDuration*1000, 'milliseconds');
                // const hours = Math.floor(durationValue.asHours());
                // const mins = Math.floor(durationValue.asMinutes()) - hours * 60;
                // const sec = Math.floor(durationValue.asSeconds()) - hours * 60 * 60 - mins * 60;
                // console.log("hh:" + hours + "mm:" + mins + "ss" + sec);
                return {
                    ...project,
                    totalDuration
                }
            })
            state.projects = updatedProjects;
        },
        setNewTask(state, task) {
            state.newTask = {...state.newTask, ...task};
        },
        resetNewTask(state) {
            state.newTask= {
                name: "",
                projectID: null,
                start: null,
                end: null,
                projectName: "No Project"
            }
        }
    },
    actions: {
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
                    // reload all projects
                    await dispatch('fetchProjects');
                }
            } catch(err) {
                console.log(err);
            } 
        },
        async createTask({commit}, task) {
            try {
                // commit('setIsLoading', true);
                const res = await axios.post('/tasks', task);
                if (res.data.success) {
                    return res.data.task._id;
                }
                commit('setNewTask', res.data.task);
            } catch(err) {
                console.log(err);
                // commit('setIsLoading', false);
                return null;
            } 
        },
        async updateTask({dispatch}, payload) {
            try {
                // commit('setIsLoading', true);
                const res = await axios.put(`/tasks/${payload.taskID}`, payload.task);
                if (res.data.success) {
                    // commit('setTasks', res.data.tasks);
                    await dispatch('fetchProjects');
                }
                // commit('setIsLoading', false);
            } catch(err) {
                console.log(err);
                // commit('setIsLoading', false);
            } 
        },
        async deleteTask({dispatch}, taskID) {
            try {
                // commit('setIsLoading', true);
                const res = await axios.delete(`/tasks/${taskID}`);
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
    },
    modules: {
    }
})
