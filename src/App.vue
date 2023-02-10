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
import { mapActions } from 'vuex';

import Navbar from "./components/Navbar";

export default {
    components: {
        Navbar,
    },
    mounted() {
        if (localStorage.activeUser) {
            this.setUser(localStorage.activeUser);
        }
    },
    methods: {
        ...mapActions([
            'setUser'
        ]),
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
