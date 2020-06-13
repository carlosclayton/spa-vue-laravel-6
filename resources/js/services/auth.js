import localStorage from "./local-storage";
import Jwt from "./resources";

export default {
    login(email, password) {
        return Jwt.accessToken(email, password)
            .then((response) => {
                localStorage.set('token', response.body.token)
                return response
            })
    },

    user(){
        return Jwt.getUser()
    },

    logout(){
        return Jwt.logout()
            .then((response) => {
                localStorage.remove('token');
                return response
            })
    }
}
