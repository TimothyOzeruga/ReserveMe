<template>
    <div id="app">
        <Navbar/>
        <main class="my-3">
            <div class="container">
                <router-view/>
            </div>
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
        });
    }
};
</script>

<style lang="scss">
    ul {
        list-style: none;
        padding: 0;
    }
    svg {
        width: 16px;
        height: 16px;
    }
</style>
