import axios from '../axios';
// import router from '../router';

const state = {
    // tasks: []
}

const getters = {
    // tasks(state) {
    //     // concatate all the tasks from every project
    //     const tasks = state.projects.map(project => {
    //         return project.tasks.map(task => {
    //             return {
    //                 ...task,
    //                 projectName: project.name
    //             }
    //         }).reduce((arr, tasks) => {
    //             arr = [...arr, ...tasks]
    //         }, []);
    //     });

    //     return tasks;
    // },

}

const mutations = {
    setTasks(state, tasks) {
        state.tasks = tasks;
    },
}

const actions = {
    async fetchTasks({commit}) {
        try {
            // commit('setIsLoading', true);
            const res = await axios.get('/tasks');
            if (res.data.success) {
                commit('setTasks', res.data.tasks);
            }
            // commit('setIsLoading', false);
        } catch(err) {
            console.log(err);
            // commit('setIsLoading', false);
        } 
    },
    async createTask({dispatch}, task) {
        try {
            // commit('setIsLoading', true);
            const res = await axios.post('/tasks', task);
            if (res.data.success) {
                // commit('setTasks', res.data.tasks);
                await dispatch('fetchTasks');
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