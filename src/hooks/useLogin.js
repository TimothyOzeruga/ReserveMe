import { useStore } from 'vuex'
import { ref } from "vue";
import { useRouter } from 'vue-router'
import validator from "validator";
import {useNotification} from "@kyvg/vue3-notification";

export default function UseLogin(credentials) {
    const store = useStore();
    const router = useRouter();
    const { notify } = useNotification();
    let errors = ref({});

    const validateLoginInput = (data) => {
        const errors = {};

        const {username, password} = data;

        if (validator.isEmpty(username)) {
            errors.username = "Username field is required.";
        }

        if (validator.isEmpty(password)) {
            errors.password = "Password field is required.";
        }

        return {
            isInvalid: Object.keys(errors).length > 0,
            errs: errors,
        };
    }

    const loginUser = () => {

        const {isInvalid, errs} = validateLoginInput(credentials);

        if (isInvalid) {
            errors.value = errs
        } else {
            errors.value = {}

            if (!localStorage.users) {
                errors.value.username = "Username does not exist!";
            }

            const lsUsers = JSON.parse(localStorage.users);

            const usernameIndex = lsUsers.findIndex(
                (user) => user.username === credentials.username
            );

            if (usernameIndex > -1) {
                const passwordIndex = lsUsers.findIndex(
                    (user) => user.password === credentials.password
                );

                if (passwordIndex > -1) {
                    const activeUser = lsUsers.find(
                        (user) => user.username === credentials.username
                    );
                    localStorage.setItem("activeUser", JSON.stringify(activeUser));
                    store.dispatch('setUser', activeUser);
                    notify({
                        title: "Successful login",
                        type: "success",
                    });
                    router.push('/');
                } else {
                    errors.value.password = "Password does not match!";
                }
            } else {
                errors.value.username = "Username does not exist!";
            }
        }
    }

    return {
        loginUser,
        errors,
    }
}