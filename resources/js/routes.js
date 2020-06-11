import Vue from 'vue';
import VueRouter from 'vue-router';
import ExampleComponent from './components/ExampleComponent';
import Login from './components/Login';
import Home from "./components/Home";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/login', component: Login},
        {path: '*', redirect: '/login'},
        {path: '/home', component: Home},
    ],
    mode: 'history'
});
