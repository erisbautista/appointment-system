import { createRouter, createWebHistory } from "vue-router";
import { useUsers } from "./stores/users";
import Dashboard from "./components/Dashboard.vue";
import LoginVue from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import Appointments from "./views/Appointments.vue";
import NotFoundPage from "./components/NotFoundPage.vue";
import Users from "./views/Users.vue";
import { useLayout } from "./composables/layout";

import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({
    position: "top-right",
    duration: "2000",
});

const layout = useLayout();

const simpleLayout = ["Login", "Register", "NotFound"];

export const routes = [
    {
        path: "/",
        name: "Dashboard",
        component: Dashboard,
        beforeEnter: (to, from, next) => {
            next();
        },
    },
    {
        path: "/login",
        name: "Login",
        component: LoginVue,
    },
    {
        path: "/register",
        name: "Register",
        component: RegisterForm,
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        beforeEnter: (to, from, next) => {
            const usersStore = useUsers();
            if (usersStore.currentUser.role !== "admin") {
                toaster.error("you're not authorized to view this page!");
                next("/");
            }
            next();
        },
    },
    {
        path: "/appointments",
        name: "Appointments",
        component: Appointments,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: NotFoundPage,
    },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const usersStore = useUsers();
    if (simpleLayout.includes(to.name) === true) {
        layout.setLayout("simple");
    } else {
        if (usersStore.authenticate() === false) {
            toaster.error("please login to view this page!");
            router.push("/login");
            return 0;
        }
        layout.setLayout("admin");
    }
    next();
});
