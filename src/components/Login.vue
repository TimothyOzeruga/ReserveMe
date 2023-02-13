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
                                        v-model="credentials.username"
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
                                        v-model="credentials.password"
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
import {reactive} from "vue";
import {useStore} from 'vuex'
import {useRouter} from "vue-router";
import UseLogin from "@/hooks/useLogin";

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        if(store.getters.getUser) {
            router.push('/');
        }

        const credentials = reactive({
            username: '',
            password: '',
        });

        return {
            credentials,
            ...UseLogin(credentials)
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
