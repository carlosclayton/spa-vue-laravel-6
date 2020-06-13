import Vue from 'vue';

export default class Jwt {
    static accessToken(email, password) {
        return Vue.http.post('access_token', {
            email: email,
            password: password
        })
    }

    static getUser(){
        return Vue.http.get('user');
    }

    static logout(){
        return Vue.http.post('logout')
    }

    static forgot(email){
        return Vue.http.post('password/forgot', {
            email: email
        })
    }
}
