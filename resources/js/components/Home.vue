<template>
    <div class="wrapper">
        <va-navibar></va-navibar>
        <va-slider></va-slider>
        <div id="content-wrap" class="content-wrapper">
            <section class="content-header">
                <h1>
                    Blank page
                    <small>it all starts here</small>
                </h1>
                <ol class="breadcrumb">
                    <li><a href="#"><i class="fa fa-dashboard"></i> Home</a></li>
                    <li><a href="#">Examples</a></li>
                    <li class="active">Blank page</li>
                </ol>
            </section>
            <section class="content">



                <!-- Default box -->
                <div class="box">
                    <div class="box-header with-border">
                        <h3 class="box-title">Title</h3>

                        <div class="box-tools pull-right">
                            <button type="button" class="btn btn-box-tool" data-widget="collapse" data-toggle="tooltip"
                                    title="" data-original-title="Collapse">
                                <i class="fa fa-minus"></i></button>
                            <button type="button" class="btn btn-box-tool" data-widget="remove" data-toggle="tooltip"
                                    title="" data-original-title="Remove">
                                <i class="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div class="box-body" style="">
                        Start creating your amazing application!
                    </div>
                    <!-- /.box-body -->
                    <div class="box-footer" style="">
                    </div>
                    <!-- /.box-footer-->
                </div>
                <!-- /.box -->
            </section>
        </div>
        <va-footer></va-footer>
    </div>

</template>

<script>
    import Vue from 'vue'
    import VAFooter from './Footer.vue'
    import VANaviBar from './NavBar.vue'
    import VASlider from './Slider.vue'


    export default {
        data() {
            return {
                type: 'E'
            }
        },
        mounted() {
            console.log('Component mounted.')
            document.body.className = 'skin-blue sidebar-mini';

        },
        methods: {

        },
        components: {
            'va-footer': VAFooter,
            'va-navibar': VANaviBar,
            'va-slider': VASlider,

        }
    }
</script>
