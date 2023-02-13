<template>
    <div class="create-board">
        <div class="create-board__mask" @click="close" />
        <div class="create-board__card card">
            <div class="create-board__card-header card-header">
                <h4 class="card-title">Crete Board</h4>
                <button type="button" class="btn-close" @click="close"></button>
            </div>
            <div class="card-body">
                <form novalidate @submit.prevent="createBoard">
                    <div class="form-group">
                        <input
                            v-model="boardInfo.name"
                            type="text"
                            class="mb-2"
                            :class="`form-control ${
                                            errors.name ? 'is-invalid' : ''
                                        }`"
                            placeholder="Board Name"
                        />
                        <div class="invalid-feedback">{{ errors.name }}</div>
                    </div>

                    <button class="btn btn-outline-success form-control">
                        Create Board
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import validator from "validator";

export default {
    name: "CreateBoard",
    setup(props, context) {
        const boardInfo = reactive({
            name: "",
            time: []
        });
        let errors = ref({});

        const createBoard = () => {
            errors.value = {}

            if (validator.isEmpty(boardInfo.name)) {
                errors.value.name = "Username field is required.";
            } else {
                context.emit('sendBoard', boardInfo);
            }

            // if(!errors.value) {
            //     context.emit('sendBoard', boardInfo);
            // }
        }

        const close = () => {
            context.emit('close', true);
        }

        return {
            boardInfo,
            errors,
            createBoard,
            close
        }
    }
}
</script>

<style lang="scss" scoped>
    .create-board {
        height: 100%;
        width: 100%;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        top: 0;
        background: rgba(0, 0, 0, 0.6);

        &__mask {
            height: 100%;
            width: 100%;
            position: fixed;
            top: 0;
            left: 0;
            z-index: 2;
        }

        &__card-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__card {
            width: 60%;
            position: relative;
            z-index: 10;
        }
    }
</style>