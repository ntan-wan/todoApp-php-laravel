<script setup>
import { reactive, computed, onBeforeMount } from "vue";
import * as utils from "@/js/lib/utils";
import { useTaskStore } from "@/js/stores/taskStore";

import Card from "primevue/card";
import CustomButton from "@/views/components/ui/CustomButton.vue";
import Checkbox from "primevue/checkbox";
import CustomDialog from "@/views/components/ui/CustomDialog.vue";
import CustomInput from "@/views/components/ui/CustomInput.vue";

/*********/
/* Setup */
/*********/
const taskStore = useTaskStore();
const props = defineProps({
    pData: { type: Object, default: {} },
});
const emit = defineEmits(["deleted", "edited"]);

/**********/
/* States */
/**********/
const rData = reactive({
    dialogIsVisible: false,
    dialogBtnIsLoading: false,
    action: "edit",
    isDone: false,

    taskForm: {
        name: "",
        description: "",
    },
});
const descripClass = computed(() => ({
    "c-line-through": rData.isDone,
}));

/******************/
/* Event handlers */
/******************/
const onClickDelete = async () => {
    rData.action = "delete";
    rData.dialogIsVisible = true;
};
const onClickEdit = () => {
    rData.action = "edit";
    rData.taskForm.name = props.pData.name;
    rData.taskForm.description = props.pData.description;
    rData.dialogIsVisible = true;
};
const onSubmitForm = async (action) => {
    const taskId = props.pData.id;
    const serviceFunc = {
        edit: taskStore.editTask,
        delete: taskStore.deleteTask,
    };
    rData.dialogBtnIsLoading = true;
    await serviceFunc[action](taskId, rData.taskForm);
    rData.dialogIsVisible = false;
    utils.clearObjData(rData.taskForm);
    emit("edited");
    rData.dialogBtnIsLoading = false;
};
const onUpdateCheckBox = async () => {
    const taskId = props.pData.id;
    const data = {
        name: props.pData.name,
        description: props.pData.description,
        is_done: rData.isDone,
    };
    await taskStore.editTask(taskId, data);
};

/***********/
/* Actions */
/***********/
onBeforeMount(async () => {
    rData.isDone = props.pData.is_done;
});
</script>

<template>
    <CustomDialog
        :pHeader="`${utils.capitalizeFirstLetter(rData.action)} Task`"
        v-model:visible="rData.dialogIsVisible"
    >
        <form @submit.prevent="onSubmitForm(rData.action)">
            <template v-if="rData.action !== 'delete'">
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
            </template>

            <template v-else-if="rData.action === 'delete'">
                <p>Are you sure you want to delete this task?</p>
            </template>

            <div class="mt-8 flex justify-end">
                <CustomButton
                    :label="utils.capitalizeFirstLetter(rData.action)"
                    type="submit"
                    :severity="rData.action === 'delete' ? 'danger' : ''"
                    :loading="rData.dialogBtnIsLoading"
                />
            </div>
        </form>
    </CustomDialog>

    <Card>
        <template #title> {{ pData.name }} </template>
        <template #content>
            <div class="flex items-center">
                <div>
                    <Checkbox
                        :inputId="pData.id"
                        v-model="rData.isDone"
                        :binary="true"
                        @update:modelValue="onUpdateCheckBox"
                    />
                </div>
                <div class="ml-3">
                    <label
                        :for="pData.id"
                        :class="descripClass"
                        class="cursor-pointer"
                    >
                        {{ pData.description }}
                    </label>
                </div>
                <div class="ml-auto flex items-center gap-3">
                    <CustomButton icon="pi pi-pencil" @click="onClickEdit" />
                    <CustomButton
                        severity="danger"
                        icon="pi pi-trash"
                        @click="onClickDelete"
                    />
                </div>
            </div>
        </template>
    </Card>
</template>
