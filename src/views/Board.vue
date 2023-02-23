<template>
 <div class="board">
     <router-link to="/">
         <svg class="board__arrow" version="1.1" viewBox="0 0 15.699 8.707"><polygon points="15.699,3.854 1.914,3.854 5.061,0.707 4.354,0 0,4.354 4.354,8.707 5.061,8 1.914,4.854 15.699,4.854 "/></svg>
     </router-link>
     <h2 class="text-center mb-4">Board {{ boardInfo.name }}</h2>
     <Calendar :board-id="boardId" :board-info="boardInfo"></Calendar>
 </div>
</template>

<script>
import { useRoute } from 'vue-router'
import Calendar from "@/components/Calendar";
import {useStore} from "vuex";

export default {
    name: "Board",
    components: {
        Calendar
    },
    setup(){
        const store = useStore();
        const route = useRoute();
        const boardId = route.params.id;
        const boardInfo = store.getters.getBoard(boardId);

        return {
            boardId,
            boardInfo
        }
    }
}
</script>

<style lang="scss" scoped>
    .board {
        &__arrow {
           width: 28px;
           height: 28px;
        }
    }
</style>