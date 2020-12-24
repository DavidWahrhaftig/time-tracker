
const state = {
    serverFeedback: null
}

const getters = {
    serverFeedback(state){
        return state.serverFeedback;
    }
}

const mutations = {
    setServerFeedback(state, res) {
        state.serverFeedback = res
    }
}

export default {
    state,
    getters,
    mutations,
}