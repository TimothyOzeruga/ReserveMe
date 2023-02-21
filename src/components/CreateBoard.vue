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
                    <div v-for="day in days" :key="day + Math.random() * 100" class="day form-group">
                        <span class="day__name">{{ day.name }}</span>
                        <div class="day__times">
                            <Datepicker
                                v-model="day.date"
                                time-picker
                                range
                                minutes-increment="60"
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
import { useStore } from 'vuex'
import validator from "validator";
import moment from "moment";

export default {
    name: "CreateBoard",
    setup(props, context) {
        const store = useStore();

        const days = ref([
            {
                name: 'Monday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Tuesday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Wednesday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Thursday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Friday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Saturday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
            {
                name: 'Sunday',
                date: [
                    {
                        hours: 8,
                        minutes: 0,
                        seconds: 0
                    },
                    {
                        hours: 18,
                        minutes: 0,
                        seconds: 0
                    }
                ],
            },
        ]);
        let errors = ref({});

        const boardInfo = reactive({
            name: "",
            days: days.value,
            minHour: days.value[0].date[0].hours,
            maxHour: days.value[0].date[1].hours,
            schedule: []
        });

        const countMinMaxHours = () => {
            boardInfo?.days.forEach(day => {
                if(boardInfo.minHour > day.date[0].hours) {
                    boardInfo.minHour = day.date[0].hours
                }

                if(boardInfo.maxHour < day.date[1].hours) {
                    boardInfo.maxHour = day.date[1].hours
                }
            });

            getDisabledDates();
        }

        const getDisabledDates = () => {
            const currentWeek = ref(moment(new Date()).isoWeek());
            const minHour = boardInfo.minHour;
            const maxHour = boardInfo.maxHour;
            const disabledDates = [];

            boardInfo.days.forEach((day, index) => {
                const disabledHours = [];
                const minDayHour = day.date[0].hours;
                const maxDayHour = day.date[1].hours;

                if(minDayHour > minHour) {
                    const diff = minDayHour - minHour;

                    for(let i = 1; i <= diff; i++) {
                        disabledHours.push(moment().hour(minDayHour - i).format('HH:00'));
                    }
                }

                if(maxDayHour < maxHour) {
                    const diff = maxHour - maxDayHour;

                    for(let i = 1; i <= diff; i++) {
                        disabledHours.push(moment().hour(maxDayHour + i).format('HH:00'));
                    }
                }

                disabledHours.forEach(hour => {
                    const disabledDate = moment().isoWeek(currentWeek.value).weekday(index + 1).format("YYYY-MM-DD ") + hour;

                    disabledDates.push({
                        date: disabledDate,
                        is_reservation: false,
                        is_disabled: true,
                    })
                });
            });

            boardInfo.schedule.push(...disabledDates);
        }

        const createBoard = async () => {
            errors.value = {}

            if (validator.isEmpty(boardInfo.name)) {
                errors.value.name = "Username field is required.";
            } else {
                await countMinMaxHours();
                await store.dispatch('setBoard', boardInfo);
                close();
            }
        }

        const close = () => {
            context.emit('close', true);
        }

        return {
            days,
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
                width: 160px;
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