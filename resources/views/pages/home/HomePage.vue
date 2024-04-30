<script setup>
import { onMounted, reactive } from "vue";
import { useTaskStore } from "@/js/stores/taskStore";
import * as utils from "@/js/lib/utils";

import CustomInput from "@/views/components/ui/CustomInput.vue";
import CustomButton from "@/views/components/ui/CustomButton.vue";
import Task from "@/views/components/todo/Task.vue";
import CustomDialog from "@/views/components/ui/CustomDialog.vue";
import CustomSkeleton from "@/views/components/ui/CustomSkeleton.vue";

const taskStore = useTaskStore();

const rData = reactive({
    dialogIsVisible: false,
    checked: false,

    createTaskData: {
        name: "",
        description: "",
    },
});

const onClickAdd = () => {
    rData.dialogIsVisible = true;
};
const onClickRefresh = async () => {
    await taskStore.refetchTasks();
};
const onSubmitForm = async () => {
    await taskStore.createTask(rData.createTaskData);
    rData.dialogIsVisible = false;
    utils.clearObjData(rData.createTaskData);
    await taskStore.refetchTasks();
};

onMounted(async () => {
    await taskStore.initStore();
});
</script>

<template>
    <div>
        <CustomDialog
            pHeader="Create Task"
            v-model:visible="rData.dialogIsVisible"
        >
            <form @submit.prevent="onSubmitForm">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label>Task</label>
                        <CustomInput
                            placeholder="Enter task name"
                            v-model="rData.createTaskData.name"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label>Description</label>
                        <CustomInput
                            placeholder="Enter Description"
                            v-model="rData.createTaskData.description"
                        />
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <CustomButton
                        label="Submit"
                        type="submit"
                        :loading="taskStore.isAddingTask"
                    />
                </div>
            </form>
        </CustomDialog>

        <div class="flex items-center gap-2">
            <CustomInput
                pPlaceholder="Search"
                pIcon="pi-search"
                class="w-full"
            />
            <CustomButton icon="pi pi-refresh" @click="onClickRefresh" />
            <CustomButton
                icon="pi pi-plus-circle"
                label="Add"
                iconPos="right"
                @click="onClickAdd"
            />
        </div>

        <div class="mt-8 flex flex-col gap-4 overflow-auto h-96">
            <template v-if="!taskStore.getTasks">
                <div class="flex flex-col gap-4">
                    <CustomSkeleton v-for="i in 5" :key="i" class="!h-10" />
                </div>
            </template>

            <template v-else>
                <Task
                    v-for="task in taskStore.getTasks"
                    :key="task.id"
                    v-model:checked="rData.checked"
                    :pDone="rData.checked"
                >
                    <template #description>
                        {{ task.description }}
                    </template>
                </Task>
            </template>
        </div>
    </div>
</template>
