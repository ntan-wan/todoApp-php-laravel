<script setup>
import { onMounted, reactive } from "vue";
import { useTaskStore } from "@/js/stores/taskStore";
import * as utils from "@/js/lib/utils";

import CustomInput from "@/views/components/ui/CustomInput.vue";
import CustomButton from "@/views/components/ui/CustomButton.vue";
import Task from "@/views/components/todo/Task.vue";
import CustomSkeleton from "@/views/components/ui/CustomSkeleton.vue";
import CustomDialog from "@/views/components/ui/CustomDialog.vue";

/**********/
/* States */
/**********/
const taskStore = useTaskStore();
const rData = reactive({
    dialogIsVisible: false,
    keyWord: "",

    taskForm: {
        name: "",
        description: "",
    },
});

/******************/
/* Event handlers */
/******************/
const onClickAdd = () => {
    rData.dialogIsVisible = true;
};
const onClickRefresh = async () => {
    await taskStore.refetchTasks();
};
const onTaskDeleted = async () => {
    await taskStore.refetchTasks();
};
const onTaskEdited = async () => {
    await taskStore.refetchTasks();
};
const onSubmitForm = async () => {
    await taskStore.addTask(rData.taskForm);
    rData.dialogIsVisible = false;
    utils.clearObjData(rData.taskForm);
    await taskStore.refetchTasks();
};

/***********/
/* Actions */
/***********/
onMounted(async () => {
    await taskStore.initStore();
});
</script>

<template>
    <div>
        <CustomDialog
            pHeader="Add Task"
            v-model:visible="rData.dialogIsVisible"
        >
            <form @submit.prevent="onSubmitForm">
                <div class="flex flex-col gap-4">
                    <div class="flex flex-col gap-2">
                        <label>Task</label>
                        <CustomInput
                            placeholder="Enter task name"
                            v-model="rData.taskForm.name"
                        />
                    </div>
                    <div class="flex flex-col gap-2">
                        <label>Description</label>
                        <CustomInput
                            placeholder="Enter Description"
                            v-model="rData.taskForm.description"
                        />
                    </div>
                </div>
                <div class="mt-8 flex justify-end">
                    <CustomButton
                        label="Add"
                        type="submit"
                        :loading="taskStore.isLoading"
                    />
                </div>
            </form>
        </CustomDialog>

        <div class="flex justify-center p-4">
            <h1 class="flex items-center gap-3">
                ToDo ({{ taskStore.tasks?.length ?? 0 }})
                <i class="pi pi-check text-2xl text-green-500 font-bold"></i>
            </h1>
        </div>

        <div class="flex items-center gap-2">
            <CustomInput
                pPlaceholder="Search"
                pIcon="pi-search"
                class="w-full"
                v-model:input="rData.keyWord"
            />
            <CustomButton icon="pi pi-refresh" @click="onClickRefresh" />
            <CustomButton
                icon="pi pi-plus-circle"
                label="Add"
                iconPos="right"
                @click="onClickAdd"
            />
        </div>

        <div class="mt-8 flex flex-col gap-4 overflow-auto h-96 pr-4">
            <template v-if="!taskStore.getTasks">
                <div class="flex flex-col gap-4">
                    <CustomSkeleton v-for="i in 5" :key="i" class="!h-10" />
                </div>
            </template>

            <template v-else>
                <Task
                    v-for="task in taskStore.filterTasks(rData.keyWord)"
                    :key="task.id"
                    :pData="task"
                    @deleted="onTaskDeleted"
                    @edited="onTaskEdited"
                />
            </template>
        </div>
    </div>
</template>
