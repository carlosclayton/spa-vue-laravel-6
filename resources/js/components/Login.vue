<template>
    <div class="login-box">
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
                <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign
                    in using
                    Google+</a>
            </div>
            <!-- /.social-auth-links -->

            <a href="#">I forgot my password</a><br>
            <a href="register.html" class="text-center">Register a new membership</a>

        </div>
        <!-- /.login-box-body -->
    </div>
</template>

<script>

    import Vue from 'vue'
    import VueResource from 'vue-resource'

    Vue.use(VueResource)

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

    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        mounted() {
            console.log('Component mounted.')
            document.body.className = 'hold-transition login-page';
        },
        methods: {
            onSubmit() {
                Jwt.accessToken(this.email, this.password)
                    .then(response => {
                        console.log('Token: ', response.body.token)
                        localStorage.set('token', response.body.token)
                    }, response => {
                        console.log('Error: ', response.body.error)
                    });
            }
        },
        components: {
            ValidationProvider,
            ValidationObserver
        }
    }
</script>
