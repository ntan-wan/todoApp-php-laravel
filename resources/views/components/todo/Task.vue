<script setup>
import { computed } from "vue";

import Card from "primevue/card";
import CustomButton from "@/views/components/ui/CustomButton.vue";
import Checkbox from "primevue/checkbox";

const props = defineProps({
    pDone: { type: Boolean, default: false },
});
const checked = defineModel("checked");
const descripClass = computed(() => ({
    "c-line-through": props.pDone,
}));
</script>

<template>
    <Card>
        <template #content>
            <div class="flex items-center">
                <div>
                    <Checkbox v-model="checked" :binary="true" />
                </div>
                <div class="ml-3">
                    <p :class="descripClass">
                        <slot name="description"></slot>
                    </p>
                </div>
                <div class="ml-auto">
                    <CustomButton icon="pi pi-trash" />
                </div>
            </div>
        </template>
    </Card>
</template>
