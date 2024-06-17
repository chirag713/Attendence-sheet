import { NextResponse } from "next/server";

import { Task } from "@/app/models/task";
import { ConnectDb } from "@/app/helper/db";

ConnectDb();


//Get user

export async function GET(request, { params }) {
    const { userid } = params;
    console.log(userid);

    try {
        
        const tasks=await Task.find({
            userId:userid,
        })

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


export async function DELETE(request, { params }) {
    try{
        const { userid } = params;
        await Task.deleteOne({
            _id: userid,
        });
        return NextResponse.json({
            message: "Task Deleted successfully!...",
            status: true
        });
    }catch(error){
        console.log(error);

        return getresponsemessage("Request failed.." ,404 , false);
    }
}


export async function PUT(request, { params }) {

    try {

        const { userid } = params;
        const { task , details } = await request.json();


        // Find the task by ID
        let taska = await Task.findById(userid);

        if (!taska) {
            return NextResponse.json({
                success: false,
                message: "Task not found",
            }, {
                status: 404, // Not Found
            });
        }

        // Update task properties
        taska.task = task;
        taska.details = details;

        // Save the updated task to the database
        const updatedTask = await taska.save();

        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}