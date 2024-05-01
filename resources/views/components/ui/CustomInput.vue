<script setup>
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";

/*********/
/* Setup */
/*********/
defineProps({
    pIconPos: {
        type: String,
        default: "left",
    },
    pIcon: { type: String, default: "" },
    pPlaceholder: { type: String, default: "" },
});
const emit = defineEmits(["update"]);
const mInput = defineModel("input");

/******************/
/* Event handlers */
/******************/
const onUpdate = (value) => {
    emit("update", value);
};
</script>

<template>
    <IconField v-if="pIcon" :iconPosition="pIconPos">
        <InputIcon :class="`pi ${pIcon}`"> </InputIcon>
        <InputText
            :placeholder="pPlaceholder"
            v-model="mInput"
            @update:modelValue="onUpdate"
        />
    </IconField>

    <InputText
        v-else
        :placeholder="pPlaceholder"
        v-model="mInput"
        @update:modelValue="onUpdate"
    />
</template>

<style scoped>
:deep(.p-inputtext) {
    @apply w-full;
}
</style>
