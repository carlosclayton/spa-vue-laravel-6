import Vue from 'vue';
import VueRouter from 'vue-router';
import ExampleComponent from './components/ExampleComponent';
import Login from './components/Login';

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {path: '/login', component: Login},
        {path: '*', redirect: '/login'}
    ],
    mode: 'history'
});
