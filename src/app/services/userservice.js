import { httpaxious } from "../helper/httphelper";

export async function Signupuser(task) {
    const result = await httpaxious.post("/api/user", task).then((response) => response.data);
    return result
}



export async function Loginuser(task) {
    const result = await httpaxious.post("/api/login", task).then((response) => response.data);
    return result
}

export async function Updateuser(userid , data) {
    const result= await httpaxious.put(`/api/user/${userid}`,data).then((response) => response.data);
    return result
}