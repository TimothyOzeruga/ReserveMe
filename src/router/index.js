import { createRouter, createWebHistory } from 'vue-router'
import Register from "../components/Register.vue";
import Login from "../components/Login.vue";
import HomeView from '../views/HomeView.vue';
import CreateBoard from '../views/CreateBoard.vue';

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/create-board",
    name: "CreateBoard",
    component: CreateBoard,
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


