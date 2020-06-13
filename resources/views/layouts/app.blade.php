<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>


    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="{{ (env('APP_ENV') === 'local') ? mix('css/app.css') : asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<div id="app">
</div>
</body>

<!-- Scripts -->
{{--<script src="https://cdn.bootcss.com/jquery/1.8.3/jquery.min.js"></script>--}}
<script src="{{ (env('APP_ENV') === 'local') ? mix('js/app.js') : asset('js/app.js') }}" defer></script>
</html>

