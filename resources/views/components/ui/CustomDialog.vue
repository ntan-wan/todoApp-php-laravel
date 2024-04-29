<script setup>
import { useSlots } from "vue";
import Dialog from "primevue/dialog";

const slots = useSlots();

defineProps({
    pHeader: { type: String, default: "" },
});
</script>

<template>
    <Dialog modal :header="pHeader" :draggable="false" class="w-4/12">
        <template #header v-if="slots.header">
            <slot name="header"></slot>
        </template>
        <slot></slot>
        <template #footer v-if="slots.footer">
            <slot name="footer"></slot>
        </template>
    </Dialog>
</template>
