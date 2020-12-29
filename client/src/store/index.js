import Vue from 'vue';
import Vuex from 'vuex';
import Tasks from './tasks';
import Projects from './projects';
import Feedback from './feedback';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        Projects,
        Tasks,
        Feedback
    }
});
