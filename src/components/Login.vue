<template>
    <div class="login">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-12 col-md-8 col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Login User</div>
                        </div>
                        <div class="card-body">
                            <form novalidate @submit.prevent="loginUser">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        :class="`form-control ${
                                            errors.username ? 'is-invalid' : ''
                                        }`"
                                        placeholder="Username"
                                        v-model="username"
                                    />
                                    <div class="invalid-feedback">{{ errors.username }}</div>
                                </div>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        :class="`form-control ${
                                            errors.password ? 'is-invalid' : ''
                                        }`"
                                        placeholder="Password"
                                        v-model="password"
                                    />
                                    <div class="invalid-feedback">{{ errors.password }}</div>
                                </div>
                                <button class="btn btn-outline-success form-control">
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import validator from "validator";
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            username: "",
            password: "",
            errors: {},
        };
    },
    methods: {
        ...mapActions([
            'setUser'
        ]),
        loginUser() {
            const credentials = {
                username: this.username,
                password: this.password,
            };

            const {isInvalid, errors} = this.validateLoginInput(credentials);

            if (isInvalid) {
                this.errors = errors;
            } else {
                this.errors = {};

                if (!localStorage.users) {
                    this.errors.username = "Username does not exist!";
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
                        this.setUser(activeUser);
                        this.$router.push('/');
                    } else {
                        this.errors.password = "Password does not match!";
                    }
                } else {
                    this.errors.username = "Username does not exist!";
                }
            }
        },
        validateLoginInput(data) {
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
                errors: errors,
            };
        }
    },
};
</script>

<style>
.login {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
</style>
