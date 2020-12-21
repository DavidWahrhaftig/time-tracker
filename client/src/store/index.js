import Vue from 'vue'
import Vuex from 'vuex'
import Tasks from './tasks';
import Projects from './projects';

Vue.use(Vuex)

export default new Vuex.Store({
    // state: {
    // },
    // mutations: {
    // },
    // actions: {
    // },
    modules: {
        Tasks,
        Projects
    }
})
