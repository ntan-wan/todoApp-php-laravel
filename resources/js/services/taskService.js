import { callApi } from "@/js/lib/axios";

export const fetchTasksData = async () => {
    const res = await callApi("get", "/tasks");
    return res;
};

export const addTask = async (data) => {
    const res = await callApi("post", "/tasks", data);
    return res;
};

export const deleteTask = async (taskId) => {
    const res = await callApi("delete", `/tasks/${taskId}`);
    return res;
};

export const editTask = async (taskId, data) => {
    const res = await callApi("put", `/tasks/${taskId}`, data);
    return res;
};
