import { defineStore } from "pinia";
import * as taskService from "@/js/services/taskService";
import { useInitStore } from "@/js/composables/useInitStore";

export const useTaskStore = defineStore("tasks", {
    state: () => ({
        tasks: null,
        isLoading: false,
    }),

    getters: {
        getTasks() {
            return this.tasks;
        },
    },

    actions: {
        initStore() {
            const fetchDataFunc = async () => {
                const res = await taskService.fetchTasksData();
                this.tasks = res?.data.tasks;
            };
            useInitStore(fetchDataFunc);
        },
        async refetchTasks() {
            this.tasks = null;
            const res = await taskService.fetchTasksData();
            this.tasks = res?.data.tasks;
        },
        async addTask(data) {
            this.isLoading = true;
            const res = await taskService.addTask(data);
            this.isLoading = false;
        },
        async deleteTask(taskId) {
            this.isLoading = true;
            const res = await taskService.deleteTask(taskId);
            this.isLoading = false;
        },
        async editTask(taskId, data) {
            this.isLoading = true;
            const res = await taskService.editTask(taskId, data);
            this.isLoading = false;
        },
        filterTasks(keyword) {
            return this.tasks.filter((task) => {
                const description = task.description.toLowerCase();
                const name = task.name.toLowerCase();
                const word = keyword.toLowerCase();
                return description.includes(word) || name.includes(word);
            });
        },
    },
});
