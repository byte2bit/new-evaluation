import { createWebHistory, createRouter } from "vue-router"

const Form = () => import(/* webpackChunkName: "form" */ '@/components/pages/Form.vue')

const routes = [
    {
        path: "/",
        name: "Form",
        component: Form,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;