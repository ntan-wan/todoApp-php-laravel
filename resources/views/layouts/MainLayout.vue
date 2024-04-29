<script setup></script>

<template>
    <div class="flex justify-center p-4">
        <h1 class="flex items-center gap-3">
            ToDo<i class="pi pi-check text-2xl text-green-500 font-bold"></i>
        </h1>
    </div>

    <div class="container">
        <slot></slot>
    </div>
</template>
