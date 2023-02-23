<template>
    <div class="schedule-block">
        <div class="schedule-block__header">
            <span
                class="schedule-block__arrow me-1"
                @click="setPrevWeek"
                :class="{
                    'schedule-block__arrow--disabled' : currentWeek === selectedWeek
                }"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M11.7 2.7a1 1 0 00-1.4-1.4l-6 6a1 1 0 000 1.4l6 6a1 1 0 001.4-1.4L6.4 8l5.3-5.3z"></path>
                </svg>
            </span>
            <span
                class="schedule-block__arrow"
                :class="{
                    'schedule-block__arrow--disabled' : selectedWeek - currentWeek > 0
                }"
                @click="setNextWeek"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                    <path d="M4.3 13.3a1 1 0 001.4 1.4l6-6c.4-.4.4-1 0-1.4l-6-6a1 1 0 00-1.4 1.4L9.6 8l-5.3 5.3z"></path>
                </svg>
            </span>
        </div>
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
                        <div v-html="tooltipText({ time, day })" class="schedule-block__tooltip" />
                    </div>
                </div>
            </div>
        </div>
        <teleport to="#modal">
            <Booking
                v-if="bookingModalVisible"
                :block-time="blockTime"
                @booked="bookTime"
                @close="closeBookingModal"
            />
        </teleport>
    </div>
</template>

<script>
import moment from 'moment'
import {onMounted, ref, toRefs} from "vue";
import {useStore} from "vuex";
import Booking from "@/components/Booking";

export default {
    name: 'Calendar',
    components: {
        Booking
    },
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
        const selectedWeek = ref(moment(new Date()).isoWeek());
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
            const blockTime = moment().isoWeek(selectedWeek.value).weekday(day).format("YYYY-MM-DD ") + time;

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
            return moment().isoWeek(selectedWeek.value).weekday(number).format("D");
        }

        const tooltipText = ({time, day}) => {
            const scheduleItem = findScheduleItemByTime({time, day});
            const blockTime = moment().isoWeek(selectedWeek.value).weekday(day).format("YYYY-MM-DD ") + time;

            if(moment(blockTime).isBefore(moment().format("YYYY-MM-DD HH:mm")) || scheduleItem?.is_disabled === true){
                return 'Unavailable'
            }
            if(scheduleItem !== undefined && scheduleItem?.is_reservation === false && scheduleItem?.is_disabled === false){
                return `<h5 class="mb-0">${scheduleItem.name}</h5><div>${scheduleItem.description}</div>`
            }

            return 'Book Time';
        }

        const setNextWeek = () => {
            selectedWeek.value += 1;
            selectedDate.value.add(7, 'days');
        }

        const setPrevWeek = () => {
            selectedWeek.value -= 1;
            selectedDate.value.subtract(7, 'days');
        }

        const bookingModalVisible = ref(false);

        const closeBookingModal = () => {
            bookingModalVisible.value = false;
        }

        const blockTime = ref("");

        const selectDate = ({time, day}) => {
            blockTime.value = moment().isoWeek(selectedWeek.value).weekday(day).format("YYYY-MM-DD ") + time;
            bookingModalVisible.value = true;
        }

        const bookTime = (bookInfo) => {
            return store.dispatch("setSchedule", { value: bookInfo, boardId: props.boardId });
        }

        return {
            schedule,
            times,
            dayNames,
            currentWeek,
            selectedWeek,
            calendarButton,
            calendarButtonDisabled,
            dayNumber,
            tooltipText,
            setNextWeek,
            setPrevWeek,
            selectDate,
            blockTime,
            closeBookingModal,
            bookingModalVisible,
            bookTime
        }
    }
}
</script>

<style lang="scss" scoped>

.schedule-block {

    &__header {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        margin-bottom: 16px;
    }

    &__arrow {
        padding: 0 8px;
        border: 1px solid #dbdbdb;
        cursor: pointer;
        text-align: center;
        width: 36px;
        height: 36px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;

        &--disabled {
            pointer-events: none;
            background: #d5d5d5;
            opacity: .4;
            color: #232e35;;
        }
    }

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

        &:hover {
            position: relative;
            border: 1px solid #888;

            .schedule-block__tooltip{
                display: block;
            }
        }
    }

    &__tooltip {
        display: none;
        position: absolute;
        left: 50%;
        top: calc(100% + 10px);
        transform: translateX(-50%);
        padding: 4px 8px;
        border-radius: 5px;
        background: #333;
        color: #d0d0d0;
        white-space: nowrap;
        z-index: 2500;

        &::after {
            content: "";
            position: absolute;
            top: -15px;
            left: 50%;
            transform: translate(-50%, 0);
            border: 6px solid transparent;
            border-bottom: 10px solid #333;
            z-index: 12;
        }
    }
}
</style>
