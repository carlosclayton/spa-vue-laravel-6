<template>
    <aside id="slider" class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                    <v-gravatar :email="currentUser.email" class="img-circle" :alt="currentUser.name" />
                </div>
                <div class="pull-left info">
                    <p>{{ currentUser.name }}</p>
                    <a href="#"><i :class="['fa fa-circle', status ? 'text-green' : 'text-red'] " ></i> {{ status ? 'Online' : 'Offline' }}</a>
                </div>
            </div>
            <form action="#" method="get" class="sidebar-form">
                <div class="input-group">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
                </button>
              </span>
                </div>
            </form>
            <ul class="sidebar-menu tree" data-widget="tree">
                <li class="header">MAIN NAVIGATION</li>
                <li class="treeview">
                    <a href="#">
                        <i class="fa fa-dashboard"></i> <span>Dashboard</span>
                        <span class="pull-right-container">
              <i class="fa fa-angle-left pull-right"></i>
            </span>
                    </a>
                    <ul class="treeview-menu">
                        <li><a href="#"><i class="fa fa-circle-o"></i> Dashboard </a></li>
                    </ul>
                </li>
            </ul>

        </section>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
    import Vue from 'vue';
    import Gravatar from 'vue-gravatar';

    Vue.component('v-gravatar', Gravatar);
    import Auth from "../services/auth";
    import store from '../services/store';

    export default {
        name: 'va-slider',
        props: {},
        created() {

        },
        data() {
            return {
                currentUser: [],
                status: store.state.loggingIn
            }
        },
        mounted() {
            if (store.state.loggingIn) this.status = 'Online';
            if (store.state.loggingIn ) this.color =  'text-green';

            Auth.user()
                .then((response) => {
                    console.log('User: ', response.data)
                    this.currentUser = response.body.data
                })
            console.log('Slider mounted');
        },

    }
</script>
