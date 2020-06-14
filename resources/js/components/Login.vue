<template>
    <div class="login-box">
        <loading :active.sync="isLoading"
                 :can-cancel="true"
                 :on-cancel="onCancel"
                 :is-full-page="fullPage"></loading>

        <div class="login-logo">
            <a href="../../index2.html"><b>Admin</b>LTE</a>
        </div>
        <!-- /.login-logo -->
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>

            <ValidationObserver v-slot="{ handleSubmit, invalid }">
                <form @submit.prevent="handleSubmit(onSubmit)">

                    <ValidationProvider name="Email" rules="required|min:3|email|max:100" v-slot="{ errors, failed }">
                        <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                            <input v-model="email" type="email" class="form-control">
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                            <span class="help-block">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>


                    <ValidationProvider name="Password" rules="required|min:3|max:100" v-slot="{ errors, failed }">
                        <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                            <input v-model="password" type="password" class="form-control">
                            <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                            <span class="help-block">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>

                    <div class="row">
                        <div class="col-xs-8">
                            <div class="checkbox icheck">
                                <label>
                                    <div class="icheckbox_square-blue" aria-checked="false" aria-disabled="false"
                                         style="position: relative;"><input type="checkbox"
                                                                            style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;">
                                        <ins class="iCheck-helper"
                                             style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins>
                                    </div>
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <!-- /.col -->
                        <div class="col-xs-4">
                            <button type="submit" :disabled="invalid" class="btn btn-primary btn-block btn-flat">
                                Sign
                                In
                            </button>
                        </div>
                        <!-- /.col -->
                    </div>
                </form>
            </ValidationObserver>

            <div class="social-auth-links text-center">
                <p>- OR -</p>
                <facebook-login
                    version="v5.0"
                    appId="1847547945539092"
                    @login="getUserData"
                    @logout="onLogout"
                    @get-initial-status="getUserData"
                    @sdk-loaded="sdkLoaded"

                >
                </facebook-login>


                <button v-on:click="loginGoogle()" class="btn btn-block btn-social btn-google btn-flat"><i
                    class="fa fa-google-plus"></i> Sign in using Google+
                </button>
            </div>
            <!-- /.social-auth-links -->
            <div class="text-center">
                <router-link :to="{ path: 'forgot'}">I forgot my password</router-link>
                <br/>
                <router-link :to="{path: 'register'}">Register</router-link>
            </div>

        </div>
        <!-- /.login-box-body -->
    </div>
</template>

<script>

    import Vue from 'vue'
    import VueResource from 'vue-resource'

    Vue.use(VueResource)

    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';

    Vue.use(VueToast);


    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    import {extend} from 'vee-validate';

    import * as rules from 'vee-validate/dist/rules';
    import {messages} from 'vee-validate/dist/locale/pt_BR.json';

    import {ValidationProvider, ValidationObserver} from 'vee-validate';

    Object.keys(rules).forEach(rule => {
        extend(rule, {
            ...rules[rule], // copies rule configuration
            message: messages[rule] // assign message
        });
    });

    import Jwt from '../services/resources'
    import localStorage from "../services/local-storage";
    import Auth from '../services/auth'


    import GAuth from 'vue-google-oauth2'

    const GauthOption = {
        clientId: '595939423328-n2posop4817aolvrtrjapas11e00k7c0.apps.googleusercontent.com',
        scope: 'profile email',
        prompt: 'select_account'
    }
    Vue.use(GAuth, GauthOption)

    import facebookLogin from 'facebook-login-vuejs';

    export default {
        data() {
            return {
                email: '',
                password: '',
                isLoading: false,
                fullPage: true
            }
        },
        mounted() {
            console.log('Component mounted.')
            document.body.className = 'hold-transition login-page';
        },
        methods: {
            getUserData() {
                this.FB.api('/me', 'GET', {fields: 'id,name,email, picture'},
                    userInformation => {
                        console.log('User face: ', userInformation)
                        Auth.register(userInformation.name, userInformation.email, userInformation.id)
                            .then((response) => {
                                this.$store.dispatch('initLogin')
                                console.log('Token: ', response.body.token)
                                this.$router.push('home');
                            }, response => {
                                console.log('Error: ', response.body.error)
                                this.isLoading = false
                                Vue.$toast.open({
                                    type: 'error',
                                    message: response.body.error,
                                    position: 'bottom',
                                    duration: 5000
                                })
                            });
                    }
                )
            },
            sdkLoaded(payload) {
                this.isConnected = payload.isConnected
                this.FB = payload.FB
                if (this.isConnected) this.getUserData()
            },
            onLogin() {
                this.isConnected = true
                this.getUserData()
            },
            onLogout() {
                this.isConnected = false;
            },
            loginGoogle() {
                console.log('Login google...')
                this.$gAuth.signIn()
                    .then(GoogleUser => {
                        console.log('user', GoogleUser)
                        var profile = GoogleUser.getBasicProfile();

                        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
                        console.log('Name: ' + profile.getName());
                        console.log('Image URL: ' + profile.getImageUrl());
                        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

                        Auth.register(profile.getName(), profile.getEmail(), profile.getId())
                            .then((response) => {
                                this.$store.dispatch('initLogin')
                                console.log('Token: ', response.body.token)
                                this.$router.push('home');
                            }, response => {
                                console.log('Error: ', response.body.error)
                                this.isLoading = false
                                Vue.$toast.open({
                                    type: 'error',
                                    message: response.body.error,
                                    position: 'bottom',
                                    duration: 5000
                                })
                            });

                    })
                    .catch(error => {
                        //on fail do something
                    })
            },
            onFailure(error) {
                console.log('Error: ', error)
            },
            onCancel() {
                console.log('User cancelled the loader.')
            },
            onSubmit() {
                this.isLoading = true
                Auth.login(this.email, this.password)
                    .then((response) => {
                        console.log('Token: ', response.body.token)
                        this.isLoading = false
                        this.$store.dispatch('initLogin')
                        this.$router.push('home');
                    }, response => {
                        console.log('Error: ', response.body.error)
                        this.isLoading = false
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.error,
                            position: 'bottom',
                            duration: 5000
                        })
                    });
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver,
            Loading,
            facebookLogin
        }
    }
</script>


<style>

    .container {
        width: 100%;
        padding-right: 0px;
        padding-left: 0px;
    }

    .container button {
        cursor: default;
        min-width: 15rem;
        color: #fff;
        box-sizing: border-box;
        margin: 0;
        align-items: center;
        justify-content: center;
        background-color: #3c57a4;
        width: 100%;
        display: inline-block;
        margin-bottom: 4px;
        font-weight: normal;
        text-align: left;
        white-space: nowrap;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.42857143;

    }
    .container button[data-v-0af1f3c3]  {
        font-size: 14px;
    }



    .container button img {

        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 32px;
        line-height: 34px;
        font-size: 1.6em;
        text-align: center;
        border-right: 1px solid rgba(0, 0, 0, 0.2);

    }

    .fb-signin-button {
        /* This is where you control how the button looks. Be creative! */
        cursor: default;
        min-width: 15rem;
        color: #fff;
        box-sizing: border-box;
        border: 1px solid rgba(255, 255, 255, 0.05);
        margin: 0;
        padding-top: 0.5rem;
        padding-left: 1.275rem;
        padding-right: 1.275rem;
        padding-bottom: 0.5rem;
        display: flex;
        align-items: center;
        border-radius: 0.25rem;
        justify-content: center;
        background-color: #3c57a4;
        width: 100%;
        margin-bottom: 5px;
    }

    .fb-signin-button i {
        margin-right: 2px;
    }

    .button {
        margin: 100%;
    }
</style>
