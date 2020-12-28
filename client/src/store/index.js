import Vue from 'vue';
import Vuex from 'vuex';
import moment from 'moment';
import axios from '../axios';
// import Tasks from './tasks';
// import Projects from './projects';
import UI from './UI';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        projects: [],
        tasks: [],
        newTask: {
            name: "",
            start: null,
            end: null,
            project: {
                _id: null,
                name: "No Project"
            }
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
                        project: project,
                        start,
                        end,
                        duration
                    }
                }).reverse();
                // });
            });
    
            const mergedTasks = [].concat.apply([], [].concat.apply([], tasks));    
            return mergedTasks;
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
                await axios.post('/projects', project);
                await dispatch('fetchProjects');
            } catch(err) {
                console.log(err);
            } 
        },
        async createTask({dispatch}, task) {
            try {
                console.log('create task:', task);
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
    },
    modules: {
        UI
    }
})
