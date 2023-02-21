<template>
    <div class="schedule-block__calendar">
        <div v-for="day of 7" :key="day" class="schedule-block__calendar-col">
            <div class="schedule-block__calendar-col-header">
                <span class="d-lg-none">{{ dayNames[day].shortName }}</span>
                <span class="d-none d-lg-block">{{ dayNames[day].fullName }}</span>
                {{ dayNumber(day) }}
            </div>
            <div class="schedule-block__calendar-col-time">
                <div
                    v-for="time in times"
                    :key="time + Math.random() * 100"
                    class="schedule-block__calendar-col-time-item"
                    :class="calendarButton({time, day})"
                    @click="calendarButtonDisabled({time, day}) && selectDate({time, day})"
                >
                    {{ time }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment'
import {onMounted, ref, toRefs} from "vue";
import {useStore} from "vuex";

export default {
    name: 'Calendar',
    props: {
        boardId: {
          type: [Number, String],
          required: true
        },
        boardInfo: {
            type: Object,
            required: true
        },
    },
    setup(props) {
        const store = useStore();
        const { boardInfo } = toRefs(props);

        const selectedDate = ref(moment(new Date()));
        const currentWeek = ref(moment(new Date()).isoWeek());
        const dayNames = {
            1: {
                fullName: 'Monday',
                    shortName: 'Mon',
            },
            2: {
                fullName: 'Tuesday',
                    shortName: 'Tue',
            },
            3: {
                fullName: 'Wednesday',
                    shortName: 'Wed',
            },
            4: {
                fullName: 'Thursday',
                    shortName: 'Thu',
            },
            5: {
                fullName: 'Friday',
                    shortName: 'Fri',
            },
            6: {
                fullName: 'Saturday',
                    shortName: 'Sat',
            },
            7: {
                fullName: 'Sunday',
                    shortName: 'Sun',
            },

        };
        const times = ref([
            '00:00',
            '01:00',
            '02:00',
            '03:00',
            '04:00',
            '05:00',
            '06:00',
            '07:00',
            '08:00',
            '09:00',
            '10:00',
            '11:00',
            '12:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
            '18:00',
            '19:00',
            '20:00',
            '21:00',
            '22:00',
            '23:00',
        ]);

        const calculateTimes = (minHour, maxHour) => {
            return times.value = times.value.slice(minHour, maxHour);
        }

        onMounted(() => {
            calculateTimes(boardInfo.value.minHour, boardInfo.value.maxHour + 1);
        });

        const schedule = ref(store.getters.getSchedule(props.boardId));

        const findScheduleItemByTime = ({time, day}) => {
            const d = selectedDate.value.isoWeekday(day).format("YYYY-MM-DD");
            return schedule.value?.find(scheduleItem => {
                return scheduleItem?.date === `${d} ${time}`
            });
        }

        const calendarButton = ({time, day}) => {
            const scheduleItem = findScheduleItemByTime({time, day});
            const blockTime = moment().isoWeek(currentWeek.value).weekday(day).format("YYYY-MM-DD ") + time;

            return {
                'schedule-block__calendar-col-time-item--disable': moment(blockTime).isBefore(moment().format("YYYY-MM-DD HH:mm"))
                    || scheduleItem?.is_disabled === true,
                'schedule-block__calendar-col-time-item--booked': scheduleItem !== undefined && scheduleItem?.is_reservation === false,
            }
        }

        const calendarButtonDisabled = ({time, day}) => {
            const classes = calendarButton({time, day});
            return !classes['schedule-block__calendar-col-time-item--disable'] && !classes['schedule-block__calendar-col-time-item--booked'];
        }

        const dayNumber = (number) => {
            return moment().isoWeek(currentWeek.value).weekday(number).format("D");
        }

        const selectDate = ({time, day}) => {
            const blockTime = moment().isoWeek(currentWeek.value).weekday(day).format("YYYY-MM-DD ") + time;

            const selectedDate = {
                date: blockTime,
                is_reservation: false,
                is_disabled: false
            }

            return store.dispatch("setSchedule", { value: selectedDate, boardId: props.boardId });
        }

        return {
            schedule,
            times,
            dayNames,
            calendarButton,
            calendarButtonDisabled,
            dayNumber,
            selectDate
        }
    }
}
</script>

<style lang="scss" scoped>

.schedule-block {

    &__calendar {
        display: flex;
    }

    &__calendar-col {
        flex-grow: 1;
        padding: 0 2px;
        flex: 1;
    }

    &__calendar-col-header {
        text-align: center;
        margin-bottom: 4px;
        padding: 4px 0;
        border-top: 2px solid #fb236a;
        background: #FEEBF1;
        font-weight: 600;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }

    &__calendar-col-time-item {
        position: relative;
        text-align: center;
        padding: 5px 0;
        margin-bottom: 4px;
        font-size: 14px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
        cursor: pointer;
        box-sizing: border-box;
        border: 1px solid transparent;
        @media screen and (max-width: 400px){
            letter-spacing: -0.2px;
        }

        &--booked {
            background: #ededed;
            color: #a4a4a4;
            cursor: not-allowed;
            border-color: #00000011;
        }

        &--disable {
            background: #fcfcfc;
            color: #d0d0d0;
            cursor: not-allowed;
            border: 1px solid transparent;
        }
    }
}
</style>
