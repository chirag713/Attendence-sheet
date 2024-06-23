import { httpaxious } from "../helper/httphelper";

export async function Addtask(task) {
    const result = await httpaxious.post("/api/tasks", task).then((response) => response.data);
    return result
}

export async function gettaskofuser(userId) {
    const result = await httpaxious.get(`/api/tasks/${userId}`).then((response) => response.data);
    return result
}


export async function deletetaskcall(taskId) {
    console.log(taskId);
    const result = await httpaxious.delete(`/api/tasks/${taskId}`).then((response) => response.data);
    return result
}

export async function updatetasklike(taskid, data) {
    console.log(data);
    const result = await httpaxious.put(`/api/tasks/${taskid}`, data).then((response) => response.data);
    return result
}


export async function gettask(taskId) {
    console.log(taskId);
    const result = await httpaxious.get(`/api/gettask/${taskId}`).then((response) => response.data);
    return result
}
