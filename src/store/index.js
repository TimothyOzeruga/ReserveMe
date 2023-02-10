import {createStore} from 'vuex'

export default createStore({
    state: {
        user: null
    },
    getters: {
        getUser: state => state.user,
    },
    mutations: {
        MUTATE_USER(state, value) {
            state.user = value;
        },
    },
    actions: {
        setUser({ commit }, value) {
            commit('MUTATE_USER', value);
        },
    },
    modules: {}
})
