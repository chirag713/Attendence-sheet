import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
    task: String,
    details: String,
    addeddate: String,
    userId:{
        type:mongoose.ObjectId,
        required:true,
    },
    score:String
});

export const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
