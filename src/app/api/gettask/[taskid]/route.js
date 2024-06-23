

import { NextResponse } from "next/server";

import { Task } from "@/app/models/task";
import { ConnectDb } from "@/app/helper/db";

ConnectDb();


//Get user

export async function GET(request, { params }) {
    const { taskid } = params;
    // console.log(userid);

    try {
        
        const tasks=await Task.findById(taskid)

        return NextResponse.json(tasks);
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to get tasks",
            status: false
        })
    }
}


