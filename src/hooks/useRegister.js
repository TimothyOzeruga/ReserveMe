import { ref } from "vue";
import { useRouter } from 'vue-router'
import validator from "validator";

export default function useRegister(user) {
    const router = useRouter();
    let errors = ref({});
    let users = [];

    const validateRegisterInput = (data) => {
        const errors = {};

        const {username, email, password, passwordConfirm} = data;

        if (localStorage.users) {
            const lsUsers = JSON.parse(localStorage.users);
            const index = lsUsers.findIndex((user) => user.username === username);
            if (index > -1) {
                errors.username = "Username already exists!";
            }
        }

        if (validator.isEmpty(username)) {
            errors.username = "Username field is required.";
        }

        if (!validator.isEmail(email)) {
            errors.email = "Please enter a valid email address.";
        }

        if (validator.isEmpty(email)) {
            errors.email = "Email field is required.";
        }

        if (validator.isEmpty(password)) {
            errors.password = "Password field is required.";
        }

        if (!validator.equals(password, passwordConfirm)) {
            errors.passwordConfirm = "Password should match!";
        }

        if (validator.isEmpty(passwordConfirm)) {
            errors.passwordConfirm = "Confirm Password field is required.";
        }

        return {
            isInvalid: Object.keys(errors).length > 0,
            errs: errors,
        };
    }

    const registerUser = () => {
        const {isInvalid, errs} = validateRegisterInput(user);

        if (isInvalid) {
            errors.value = errs;
        } else {
            errors = {};

            if (localStorage.users) {
                users = JSON.parse(localStorage.users);
            }

            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            router.push("/login");
        }
    }

    return {
        registerUser,
        errors,
    }
}