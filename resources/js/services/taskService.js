import { callApi } from "@/js/lib/axios";

export const fetchTasksData = async () => {
    const res = await callApi("get", "/tasks");
    return res;
};

export const createTask = async (data) => {
    const res = await callApi("post", "/tasks", data);
    return res;
};
