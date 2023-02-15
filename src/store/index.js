import {createStore} from 'vuex'

export default createStore({
    state: {
        user: null,
        boards: []
    },
    getters: {
        getUser: state => state.user,
        getBoards: state => state.boards,
        getBoard: state => id => state.boards.find((entry, index) => index + 1 === +id),
    },
    mutations: {
        MUTATE_USER(state, value) {
            state.user = value;
        },
        MUTATE_BOARDS(state, value) {
            state.boards.push(value);
        },
    },
    actions: {
        setUser({ commit }, value) {
            commit('MUTATE_USER', value);
        },
        setBoard({ commit, getters }, value) {
            commit('MUTATE_BOARDS', value);
            localStorage.setItem("boards", JSON.stringify(getters.getBoards))
        },
        setBoards({ state, getters }, value) {
            state.boards = value;
            localStorage.setItem("boards", JSON.stringify(getters.getBoards));
        },
        removeBoard({ state }, index) {
            state.boards.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(state.boards));
        },
    },
    modules: {}
})
