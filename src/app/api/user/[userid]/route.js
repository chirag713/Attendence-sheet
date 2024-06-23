import { ConnectDb } from "@/app/helper/db";
import { getresponsemessage } from "@/app/helper/responsemessage";
import { User } from "@/app/models/user";

import { NextResponse } from "next/server";


ConnectDb();

export async function PUT(request, { params }) {

    try {

        const { userid } = params;
        const { profileurl, newPassword } = await request.json();


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

        if (profileurl) {
            taska.profileurl = profileurl;

            console.log(profileurl);
        }else if (newPassword){
            taska.password = newPassword;
            console.log(newPassword);
        }

        // Save the updated task to the database

        console.log(taska);
        const updatedTask = await taska.save();

        return NextResponse.json(updatedTask);

    } catch (error) {
        console.log(error);
        return getresponsemessage("Error in updating !!..", 500, false);
    }
}

export async function GET(request, { params }) {
    try {
        const { userid } = params;

        // Find the user by ID
        const user = await User.findById(userid);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 404, // Not Found
                }
            );
        }

        return NextResponse.json(user);
    } catch (error) {
        console.log(error);
        return NextResponse.json(
            {
                success: false,
                message: "Error in retrieving user",
            },
            {
                status: 500, // Internal Server Error
            }
        );
    }
}