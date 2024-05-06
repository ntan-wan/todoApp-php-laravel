@props([
    'task' => null
])

<div class="flex items-center gap-3 p-3 border border-solid border-slate-400 rounded-lg">
    <div></div>
    <div>
        <label class="c-title">{{$task->name}}</label>
        <p class="c-description">
            {{$task->description}}
        </p>
    </div>
    <div>
    </div>
</div>