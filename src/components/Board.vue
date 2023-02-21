<template>
    <li class="home__board border rounded p-4 mb-3">
        <h4>{{ board.name }}</h4>

        <div>
            <router-link class="me-4" :to="'/board/' + (index + 1)">
                <svg viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M11 0a1 1 0 011 1h2a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V3c0-1.1.9-2 2-2h2a1 1 0 112 0h4a1 1 0 011-1zm3 8H2v6h12V8zm-9 2a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zm3 0a1 1 0 110 2 1 1 0 010-2zM4 3H2v3h12V3h-2a1 1 0 01-2 0H6a1 1 0 11-2 0z"></path></svg>
            </router-link>
            <span @click="removeBoard(index)" class="home__remove">
                <svg viewBox="0 0 16 16"><path fill="currentColor" fill-rule="evenodd" d="M8 0a2 2 0 011.7 1H13a3 3 0 013 3 2 2 0 01-1 1.7V14a2 2 0 01-2 2H3a2 2 0 01-2-2V5.7A2 2 0 010 4a3 3 0 013-3h3.3c.3-.6 1-1 1.7-1zm5 6H3v8h10V6zM8 7c.5 0 1 .4 1 .9V12a1 1 0 01-2 .1V8c0-.6.4-1 1-1zM5 7c.5 0 1 .4 1 .9V12a1 1 0 01-2 .1V8c0-.6.4-1 1-1zm6 0c.6 0 1 .4 1 1v4a1 1 0 01-2 0V8c0-.6.4-1 1-1zm2-4H3a1 1 0 00-1 1h12c0-.6-.4-1-1-1z"></path></svg>
            </span>
        </div>
    </li>
</template>

<script>
export default {
    name: "Board",
    props: {
        board: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        }
    },
    setup(props, context) {
        const removeBoard = (index) => {
            context.emit('removeBoard', index);
        }

        return {
            removeBoard
        }
    }
}
</script>

<style scoped>

</style>