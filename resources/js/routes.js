import Vue from 'vue';
import VueRouter from 'vue-router';
import localStorage from "./services/local-storage";
import Login from './components/Login';
import Home from "./components/Home";
import store from './services/store';
import Forgot from "./components/Forgot";
import Register from "./components/Register";

Vue.use(VueRouter);


const router = new VueRouter({
    routes: [
        {
            path: '/home',
            component: Home,
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/forgot',
            component: Forgot,
        },
        {
            path: '/register',
            component: Register
        },
        {
            path: '*',
            redirect: '/login'
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    const publicPages = ['/login', '/forgot', '/register', '/'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.get('token');

    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;
