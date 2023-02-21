<template>
    <div class="home">
        <h2 v-if="!user" class="text-center">Sign in to create a board</h2>
        <template v-else>
            <div class="home__heading">
                <h2>Boards:</h2>
                <div class="home__heading--right">
                    <button
                        :disabled="boards.length >= 3"
                        type="button"
                        class="btn btn-primary home__create"
                        @click="createBoard"
                    >
                        Create Board
                        <svg viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 0a8 8 0 110 16A8 8 0 018 0zm0 3a1 1 0 00-1 1v3H4a1 1 0 100 2h3v3a1 1 0 002 0V9h3a1 1 0 000-2H9V4c0-.6-.4-1-1-1z"></path></svg>
                    </button>
                    {{ boards.length }} / 3
                </div>
            </div>
            <ul class="home__boards">
                <Board
                    v-for="(board, index) in boards"
                    :key="index"
                    :board="board"
                    :index="index"
                    @removeBoard="removeBoard"
                />
            </ul>

            <teleport to="#modal">
                <CreateBoard
                    v-if="createBoardVisible"
                    @close="createBoardVisible = false"/>
            </teleport>
        </template>
    </div>
</template>

<script>
import {computed, ref} from "vue";
import { useStore } from 'vuex'
import Board from "@/components/Board";
import CreateBoard from "@/components/CreateBoard";

export default {
    name: 'HomeView',
    components: {
        Board,
        CreateBoard,
    },
    setup() {
        const store = useStore();
        const user = computed(() => store.getters.getUser);
        const boards = computed(() => store.getters.getBoards);
        const createBoardVisible = ref(false);
        const removeBoard = () => store.dispatch('removeBoard');

        const createBoard = () => {
            createBoardVisible.value = true;
        }

        return {
            user,
            createBoardVisible,
            boards,
            createBoard,
            removeBoard
        }
    }
};
</script>

<style lang="scss">
    .home {
        &__heading {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;

            &--right {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
        }

        &__create {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        &__board {
            height: 80px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__remove {
            cursor: pointer;
        }
    }
</style>
