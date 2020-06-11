<template>
    <aside id="slider" class="main-sidebar">
        <!-- sidebar: style can be found in sidebar.less -->
        <section class="sidebar">
            <div class="user-panel">
                <div class="pull-left image">
                    <img src="~admin-lte/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">
                </div>
                <div class="pull-left info">
                    <p>{{ currentUser.name }}</p>
                    <a href="#"><i class="fa fa-circle text-success"></i> {{ currentUser.state.name }}</a>
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

    export default {
        name: 'va-slider',
        props: {},
        created() {

        },
        data() {
            return {
                currentUser: {
                    name: "Alexander Pierce",
                    position: "Web Developer",
                    state: {
                        color: "#3c763d",
                        name: "Online"
                    },
                    createdAt: "2018-03-30T21:06:47.164Z"
                },
            }
        },
        mounted() {
            console.log('Slider mounted');
        },

    }
</script>
