<template>
    <div class="register">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-sm-12 col-md-8 col-lg-6">
                    <div class="card">
                        <div class="card-header">
                            <div class="card-title">Register User</div>
                        </div>
                        <div class="card-body">
                            <form novalidate @submit.prevent="registerUser">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        :class="`form-control ${
                                            errors.username ? 'is-invalid' : ''
                                        }`"
                                        placeholder="Username"
                                        v-model="registerInfo.username"
                                    />
                                    <div class="invalid-feedback">{{ errors.username }}</div>
                                </div>
                                <div class="form-group">
                                    <input
                                        type="email"
                                        :class="`form-control ${errors.email ? 'is-invalid' : ''}`"
                                        placeholder="Email"
                                        v-model="registerInfo.email"
                                    />
                                    <div class="invalid-feedback">{{ errors.email }}</div>
                                </div>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        :class="`form-control ${
                                            errors.password ? 'is-invalid' : ''
                                        }`"
                                        placeholder="Password"
                                        v-model="registerInfo.password"
                                    />
                                    <div class="invalid-feedback">{{ errors.password }}</div>
                                </div>
                                <div class="form-group">
                                    <input
                                        type="password"
                                        :class="`form-control ${
                                            errors.passwordConfirm ? 'is-invalid' : ''
                                        }`"
                                        placeholder="Confirm Password"
                                        v-model="registerInfo.passwordConfirm"
                                    />
                                    <div class="invalid-feedback">{{ errors.passwordConfirm }}</div>
                                </div>
                                <button class="btn btn-outline-success form-control">
                                    Register
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
import {reactive} from "vue";
import useRegister from "@/hooks/useRegister";
import {useStore} from "vuex";
import {useRouter} from "vue-router";

export default {
    name: 'Register',
    setup() {
        const store = useStore();
        const router = useRouter();

        if(store.getters.getUser) {
            router.push('/');
        }

        const registerInfo = reactive({
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
        });

        return {
            registerInfo,
            ...useRegister(registerInfo)
        }
    },
};
</script>

<style>
.register {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
}
</style>
