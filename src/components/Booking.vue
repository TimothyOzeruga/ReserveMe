<template>
    <div class="create-board">
        <div class="create-board__mask" @click="close" />
        <div class="create-board__card card">
            <div class="create-board__card-header card-header">
                <h4 class="card-title">Book a Time</h4>
                <button type="button" class="btn-close" @click="close"></button>
            </div>
            <div class="card-body">
                <form novalidate @submit.prevent="BookTime">
                    <div class="form-group">
                        <input
                            v-model="bookingInfo.name"
                            type="text"
                            class="mb-2"
                            :class="`form-control ${
                                errors.name ? 'is-invalid' : ''
                            }`"
                            placeholder="Booking Name"
                        />
                        <div class="invalid-feedback">{{ errors.name }}</div>
                    </div>
                    <div class="form-group">
                        <input
                            v-model="bookingInfo.description"
                            type="text"
                            class="mb-2"
                            :class="`form-control ${
                                errors.description ? 'is-invalid' : ''
                            }`"
                            placeholder="Booking Description"
                        />
                        <div class="invalid-feedback">{{ errors.description }}</div>
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
    name: "Booking",
    props: {
        blockTime: {
            type: String,
            required: true
        }
    },
    setup(props, context) {

        let errors = ref({});
        const bookingInfo = reactive({
            name: "",
            description: ""
        });

        const validateBookingInput = (data) => {
            const errors = {};

            const {name, description} = data;

            if (validator.isEmpty(name)) {
                errors.name = "Name field is required.";
            }

            if (validator.isEmpty(description)) {
                errors.description = "Description field is required.";
            }

            if (!validator.isLength(name, 0, 20)) {
                errors.name = "Max number of letters - 20";
            }

            if (!validator.isLength(description, 0, 30)) {
                errors.description = "Max number of letters - 30";
            }

            return {
                isInvalid: Object.keys(errors).length > 0,
                errs: errors,
            };
        }

        const BookTime = () => {
            const {isInvalid, errs} = validateBookingInput(bookingInfo);

            if (isInvalid) {
                errors.value = errs
            } else {
                errors.value = {}

                context.emit('booked', {
                    ...bookingInfo,
                    date: props.blockTime,
                    is_reservation: false,
                    is_disabled: false
                })
                close();
            }
        }

        const close = () => {
            context.emit('close', true);
        }

        return {
            bookingInfo,
            errors,
            BookTime,
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
}
</style>