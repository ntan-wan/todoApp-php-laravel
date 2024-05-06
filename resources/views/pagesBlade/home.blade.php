<x-main-layout>
    <div class="text-right">
        <x-button onclick="">Refresh</x-button>
    </div>

    <div class="mt-3 flex flex-col gap-3">
        @foreach($tasks as $task)
            <x-task :task="$task" />
        @endforeach
    </div>
</x-main-layout>