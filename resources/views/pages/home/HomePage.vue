<script setup>
import { reactive } from "vue";

import CustomInput from "@/views/components/ui/CustomInput.vue";
import CustomButton from "@/views/components/ui/CustomButton.vue";
import Task from "@/views/components/todo/Task.vue";
import CustomDialog from "@/views/components/ui/CustomDialog.vue";

const rData = reactive({
    dialogIsVisible: false,
    checked: false,
});

const onClickAdd = () => {
    rData.dialogIsVisible = true;
};
</script>

<template>
    <div>
        <CustomDialog
            pHeader="Create Task"
            v-model:visible="rData.dialogIsVisible"
        >
            <div class="flex flex-col gap-4">
                <div class="flex flex-col gap-2">
                    <label>Task</label>
                    <CustomInput placeholder="Enter task name" />
                </div>
                <div class="flex flex-col gap-2">
                    <label>Description</label>
                    <CustomInput placeholder="Enter Description" />
                </div>
            </div>
            <div class="mt-8 flex justify-end">
                <CustomButton label="Add Task" icon="pi pi-plus-circle" />
            </div>
        </CustomDialog>

        <div class="flex items-center gap-2">
            <CustomInput
                pPlaceholder="Search"
                pIcon="pi-search"
                class="w-full"
            />
            <CustomButton
                icon="pi pi-plus-circle"
                label="Add"
                iconPos="right"
                @click="onClickAdd"
            />
        </div>

        <div class="mt-4 flex flex-col gap-4">
            <Task
                v-for="i in 5"
                :key="i"
                v-model:checked="rData.checked"
                :pDone="rData.checked"
            >
                <template #description>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Libero, est.
                </template>
            </Task>
        </div>
    </div>
</template>
