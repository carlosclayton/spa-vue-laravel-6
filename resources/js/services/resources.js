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
}
