import {createStore} from 'vuex'

export default createStore({
    state: {
        user: null,
        boards: [],
    },
    getters: {
        getUser: state => state.user,
        getBoards: state => state.boards,
        getBoard: state => id => state.boards?.find((entry, index) => index + 1 === +id),
        getSchedule: state => id => state.boards?.find((entry, index) => index + 1 === +id)?.schedule
    },
    mutations: {
        MUTATE_USER(state, value) {
            state.user = value;
        },
        MUTATE_BOARDS(state, value) {
            state.boards.push(value);
        },
        MUTATE_SCHEDULE(state, { value, boardId }) {
            const board = state.boards.find((entry, index) => index + 1 === +boardId);

            if (Array.isArray(value)) {
                board?.schedule.push(...value);
            } else {
                board?.schedule.push(value);
            }
        },
    },
    actions: {
        setUser({ commit }, value) {
            commit('MUTATE_USER', value);
        },
        setBoard({ commit, getters }, value) {
            commit('MUTATE_BOARDS', value);
            localStorage.setItem("boards", JSON.stringify(getters.getBoards));
        },
        setBoards({ state, getters }, value) {
            state.boards = value;
            localStorage.setItem("boards", JSON.stringify(getters.getBoards));
        },
        removeBoard({ state }, index) {
            state.boards.splice(index, 1);
            localStorage.setItem("boards", JSON.stringify(state.boards));
        },
        setSchedule({ commit, getters }, { value, boardId }) {
            commit('MUTATE_SCHEDULE', { value, boardId });
            localStorage.setItem("boards", JSON.stringify(getters.getBoards));
        },
    },
    modules: {}
})
