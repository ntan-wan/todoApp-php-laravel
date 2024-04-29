<script setup>
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

defineProps({
    pIconPos: {
        type: String,
        default: "left",
    },
    pIcon: { type: String, default: "" },
    pPlaceholder: { type: String, default: "" },
});
</script>

<template>
    <IconField v-if="pIcon" :iconPosition="pIconPos">
        <InputIcon :class="`pi ${pIcon}`"> </InputIcon>
        <InputText :placeholder="pPlaceholder" />
    </IconField>

    <InputText v-else :placeholder="pPlaceholder" />
</template>

<style scoped>
:deep(.p-inputtext) {
    @apply w-full;
}
</style>
