import Vue from 'vue';
import localStorage from "./local-storage";

Vue.http.interceptors.push(function (request, next) {
    request.headers.set('Authorization', `Bearer ${localStorage.get('token')}`);
    next();
})
