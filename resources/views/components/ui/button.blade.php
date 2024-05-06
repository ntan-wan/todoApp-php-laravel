@props([
    'severity' => 'default'
])

@php
    $buttonClass = [
        'p-3 rounded-lg cursor-pointer', 
        'bg-red-500 text-white border-red-500' => $severity == 'warning'
    ];
@endphp

<button 
{{$attributes->class($buttonClass)}}>
    {{$slot}}
</button>