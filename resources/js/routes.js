import Vue from 'vue';
import VueRouter from 'vue-router';
import localStorage from "./services/local-storage";
import Login from './components/Login';
import Home from "./components/Home";

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
            path: '*',
            redirect: '/login'
        }
    ],
    mode: 'history'
});

router.beforeEach((to, from, next) => {

    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.get('token');


    if (authRequired && !loggedIn) {
        return next('/login');
    }

    next();
})

export default router;
