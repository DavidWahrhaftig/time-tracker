
const state = {
    serverFeedback: null,
}

const getters = {
    serverFeedback(state){
        return state.serverFeedback;
    }
}

const mutations = {
    setServerFeedback(state, feedback) {
        state.serverFeedback = feedback;
    }
}

export default {
    state,
    getters,
    mutations,
}