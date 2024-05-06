<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    @vite(['resources/js/app.js'])
    <title>Main Layout</title>
</head>
<body>
    <x-navbar></x-navbar>
    <div class="container pt-4">
        {{$slot}}
    </div>
</body>
</html>