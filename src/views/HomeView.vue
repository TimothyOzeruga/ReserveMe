<template>
    <div class="home">
        <h2 v-if="!getUser" class="text-center">Sign in to create a board</h2>
        <template v-else>
            <div class="home__heading">
                <h2>Boards:</h2>
                <router-link class="home__create nav-link" to="/create-board">
                    Create Board
                    <svg viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 3a1 1 0 00-1 1v3H4a1 1 0 100 2h3v3a1 1 0 002 0V9h3a1 1 0 000-2H9V4c0-.6-.4-1-1-1z"></path></svg>
                </router-link>
            </div>
            <ul class="home__boards">
                <li class="home__board border rounded p-4" >
                    <h4>Board Name</h4>

                    <div>
                        <span class="mr-4">Забронировать</span>
                        <span>Посмотреть бронь</span>
                    </div>
                </li>
            </ul>
        </template>
    </div>
</template>

<script>

import { mapGetters } from "vuex";

export default {
    name: 'HomeView',
    computed: {
        ...mapGetters([
            'getUser'
        ])
    },
}
</script>

<style lang="scss">
    .home {
        &__heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        &__create {
            display: flex;
            align-items: center;
            gap: 4px;
        }

        &__board {
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>
