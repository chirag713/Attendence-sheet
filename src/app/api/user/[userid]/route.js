import { ConnectDb } from "@/app/helper/db";
import { User } from "@/app/models/user";

import { NextResponse } from "next/server";


ConnectDb();

export async function PUT(request, { params }) {

    try {

        const { userid } = params;
        const { profileurl } = await request.json();


        // Find the task by ID
        let taska = await User.findById(userid);

        if (!taska) {
            return NextResponse.json({
                success: false,
                message: "Task not found",
            }, {
                status: 404, // Not Found
            });
        }
        taska.profileurl=profileurl;

        console.log(profileurl);

        // Save the updated task to the database

        console.log(taska);
        const updatedTask = await taska.save();

        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}