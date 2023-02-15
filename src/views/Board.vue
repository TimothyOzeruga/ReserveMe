<template>
 <div>
     <h2 class="text-center mb-4">Board {{ boardInfo.name }}</h2>
     <Calendar></Calendar>
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

<style scoped>

</style>