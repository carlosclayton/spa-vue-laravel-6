<template>
    <header class="main-header">

        <simplert :useRadius="true"
                  :useIcon="true"
                  ref="simplert">
        </simplert>


        <router-link to="/home" class="logo">
            <span class="logo-mini"><b>A</b>LT</span>
            <span class="logo-lg"><b>Admin</b>LTE</span>
        </router-link>

        <nav class="navbar navbar-static-top">
            <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <div class="navbar-custom-menu">
                <ul class="nav navbar-nav">




                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <v-gravatar :email="currentUser.email" class="user-image" :alt="currentUser.name" />
                            <span class="hidden-xs">{{ currentUser.name }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->

                            <li class="user-header">
                                <v-gravatar :email="currentUser.email" class="img-circle" :alt="currentUser.name" />

                                <p>
                                    {{ currentUser.name }}
                                </p>
                                {{ currentUser.role | role }}
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat"><span
                                        class="glyphicon glyphicon-tasks"></span> Cadastro </a>
                                </div>
                                <div class="pull-right">
                                    <button @click.prevent="sendLogout"  class="btn btn-danger btn-flat"><span
                                        class="glyphicon glyphicon-off"></span> Logout
                                    </button>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import Vue from 'vue';
    import Gravatar from 'vue-gravatar';
    Vue.component('v-gravatar', Gravatar);
    import Auth from '../services/auth';
    import Simplert from 'vue2-simplert';

    export default {
        name: 'va-navibar',
        data() {
            return {
                currentUser: [],
            }
        },
        filters: {
            role: function (value) {
                if (value == 1) return 'Administrator'
                return 'User'
            }
        },
        mounted() {
            Auth.user()
                .then((response) => {
                    console.log('User: ', response.data)
                    this.currentUser = response.body.data
                })

            console.log('Navbar mounted');
        },
        methods: {
            logout() {
                Auth.logout()
                    .then(() => {
                        this.$store.dispatch('initLogout')
                        this.$router.push('/login');
                        Vue.$toast.open({
                            type: 'success',
                            message: 'Logout with success.',
                            position: 'bottom',
                            duration: 5000
                        })
                    })
                    .catch((response) => {
                        Vue.$toast.open({
                            type: 'error',
                            message: response.body.error,
                            position: 'bottom',
                            duration: 5000
                        })
                    })


            },
            sendLogout() {
                let obj = {
                    title: 'Logout',
                    message: 'Deseja sair do sistema?',
                    type: 'error',
                    useConfirmBtn: true,
                    customConfirmBtnText: 'Sim',
                    customCloseBtnText: 'Não',
                    customConfirmBtnClass: 'btn btn-primary btn-block margin-bottom btn-lg',
                    customCloseBtnClass: 'btn btn-danger btn-block margin-bottom btn-lg',
                    onConfirm: this.logout
                }
                this.$refs.simplert.openSimplert(obj)

            }
        },
        components: {
            Simplert
        }


    }

</script>
