import {createRouter, createWebHistory} from 'vue-router'
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import HomeView from '../views/HomeView.vue';
import Board from '../views/Board.vue';

const routes = [
    {
        path: "/",
        name: "Home",
        component: HomeView,
    },
    {
        path: "/board/:id",
        name: "Board",
        component: Board,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router


