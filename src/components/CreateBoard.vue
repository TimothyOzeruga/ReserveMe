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
                    <hr>
                    <div class="mb-4 fw-semibold">Set the hours you are available:</div>
                    <div v-for="day in boardInfo.days" :key="day + Math.random() * 100" class="day form-group">
                        <span class="day__name">{{ day.name }}</span>
                        <div class="day__times">
                            <Datepicker
                                v-model="day.start"
                                time-picker
                                minutes-increment="60"
                                hide-input-icon
                                class="day__time"
                            />
                            -
                            <Datepicker
                                v-model="day.end" time-picker
                                minutes-increment="60"
                                hide-input-icon
                                class="day__time"
                            />
                        </div>
                    </div>
                    <hr>
                    <button class="btn btn-primary form-control">
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
            days: [
                {
                    name: 'Monday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Tuesday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Wednesday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Thursday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Friday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Saturday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
                {
                    name: 'Sunday',
                    start: {
                        hours: 8,
                        minutes: 0o0
                    },
                    end: {
                        hours: 18,
                        minutes: 0o0
                    }
                },
            ]
        });
        let errors = ref({});

        const createBoard = () => {
            errors.value = {}

            if (validator.isEmpty(boardInfo.name)) {
                errors.value.name = "Username field is required.";
            } else {
                context.emit('sendBoard', boardInfo);
            }
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
            width: 50%;
            position: relative;
            z-index: 10;

            @media screen and (max-width: 880px){
                width: 80%;
            }
        }

        .day {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;

            &__name {
                width: 90px;
            }

            &__times {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            &__time {
                width: 100px;
            }

            ::v-deep {
                .dp__input {
                    text-align: center;
                }

                .dp__clear_icon {
                    display: none;
                }
            }
        }
    }
</style>