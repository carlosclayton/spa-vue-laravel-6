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
            <p class="login-box-msg">Forgot password</p>

            <ValidationObserver v-slot="{ handleSubmit, invalid }">
                <form @submit.prevent="handleSubmit(onSubmit)">

                    <ValidationProvider name="Email" rules="required|min:3|email|max:100" v-slot="{ errors, failed }">
                        <div :class="{'form-group': true,  'has-feedback': true, 'has-error': failed }">
                            <input v-model="email" type="email" class="form-control">
                            <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                            <span class="help-block">{{ errors[0] }}</span>
                        </div>
                    </ValidationProvider>
                    <div class="row">
                        <div class="col-xs-4 text-right">
                            <button type="submit" :disabled="invalid" class="btn btn-primary btn-block btn-flat">
                                Send
                            </button>
                            <router-link class="btn btn-danger" :to="{ path: 'login'}">Cancel</router-link>
                        </div>
                    </div>
                </form>
            </ValidationObserver>
        </div>
        <!-- /.login-box-body -->
    </div>
</template>

<script>


    import Vue from 'vue';
    import VueToast from 'vue-toast-notification';
    import 'vue-toast-notification/dist/theme-default.css';

    Vue.use(VueToast);



    import Loading from 'vue-loading-overlay';
    import 'vue-loading-overlay/dist/vue-loading.css';

    import Jwt from '../services/resources'
    import Auth from '../services/auth'

    import {extend} from 'vee-validate';

    import * as rules from 'vee-validate/dist/rules';
    import {messages} from 'vee-validate/dist/locale/pt_BR.json';

    import {ValidationProvider, ValidationObserver} from 'vee-validate';
    import localStorage from "../services/local-storage";

    Object.keys(rules).forEach(rule => {
        extend(rule, {
            ...rules[rule], // copies rule configuration
            message: messages[rule] // assign message
        });
    });

    export default {
        data() {
            return {
                email: '',
                isLoading: false,
                fullPage: true

            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods: {
            onCancel() {
                console.log('User cancelled the loader.')
            },
            onSubmit() {

                this.isLoading = true
                Auth.forgot(this.email)
                    .then((response) => {
                        console.log('Message: ', response.body.message)
                        this.isLoading = false
                        Vue.$toast.open({
                            type: 'success',
                            message: response.body.message,
                            position: 'bottom',
                            duration: 5000
                        })

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
