<template>
    <div id="app">
        <Navbar/>
        <main class="my-3">
            <div class="container">
                <router-view/>
            </div>
            <div id="modal" />
            <Notifications />
        </main>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { onMounted } from "vue";

import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar,
    },
    setup() {
        const store = useStore();

        onMounted(() => {
            if (localStorage.activeUser) {
                store.dispatch('setUser', localStorage.activeUser);
            }
            if (localStorage.boards) {
                store.dispatch('setBoards', JSON.parse(localStorage.boards));
            }
        });
    }
};
</script>

<style lang="scss">
    @import './styles/styles';
</style>
