<template>
    <nav class="navbar navbar-expand navbar-dark bg-dark">
        <div class="container">
            <router-link class="navbar-brand" to="/">Reserve Me</router-link>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item" v-if="!user">
                        <router-link class="nav-link" to="/register">Register</router-link>
                    </li>
                    <li class="nav-item" v-if="!user">
                        <router-link class="nav-link" to="/login">Login</router-link>
                    </li>
                    <li class="nav-item" v-if="user">
                        <a class="nav-link" href="" @click.prevent="logout">Logout</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { computed } from "vue";
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
    setup() {
        const store = useStore();
        const router = useRouter();

        const user = computed(() => store.getters.getUser);

        const logout = () => {
            localStorage.removeItem("activeUser");
            store.dispatch('setUser', null);
            router.push("/login");
        }

        return {
            user,
            logout
        }
    }
};
</script>

<style></style>
