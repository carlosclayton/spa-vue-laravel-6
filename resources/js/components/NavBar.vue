<template>
    <header class="main-header">


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
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">Nenhuma mensagem</li>

                        </ul>
                    </li>
                    <li class="dropdown notifications-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-bell-o"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">Nenhuma tarefa</li>

                        </ul>
                    </li>
                    <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa  fa-users"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li class="header">You have 0 tasks</li>
                        </ul>
                    </li>
                    <li class="dropdown user user-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <img src="~admin-lte/dist/img/user2-160x160.jpg" class="user-image" alt="User Image">
                            <span class="hidden-xs">{{ currentUser.name }}</span>
                        </a>
                        <ul class="dropdown-menu">
                            <!-- User image -->

                            <li class="user-header">
                                <img src="~admin-lte/dist/img/user2-160x160.jpg" class="img-circle" alt="User Image">

                                <p>
                                    {{ currentUser.name }}
                                </p>
                                {{ currentUser.position }}
                            </li>
                            <!-- Menu Footer-->
                            <li class="user-footer">
                                <div class="pull-left">
                                    <a href="#" class="btn btn-default btn-flat"><span
                                        class="glyphicon glyphicon-tasks"></span> Cadastro </a>
                                </div>
                                <div class="pull-right">
                                    <button class="btn btn-danger btn-flat"><span
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


    export default {
        name: 'va-navibar',
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
            console.log('Navbar mounted');
        },


    }

</script>
