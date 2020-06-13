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
                <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign
                    in using
                    Facebook</a>
                <button v-on:click="loginGoogle()" class="btn  btn-google"><i
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
            loginGoogle() {
                console.log('Login google...')
                this.$gAuth.signIn()
                    .then(GoogleUser => {
                        console.log(GoogleUser.w3.ig + " " + GoogleUser.w3.U3 + " " + GoogleUser.w3.Eea)
                        Auth.register(GoogleUser.w3.ig, GoogleUser.w3.U3, GoogleUser.w3.Eea)
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
            Loading
        }
    }
</script>
