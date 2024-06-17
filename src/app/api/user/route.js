

import { ConnectDb } from "@/app/helper/db";
import { User } from "@/app/models/user";
import { NextResponse } from "next/server";

ConnectDb();

export async function POST(request) {



    // fetch user detail from request


    const { name, email, password } = await request.json();


    console.log(name, email, password);

    // create user object with user model

    const newuser = new User({
        name,
        email,
        password,
    })

    try {

        // newuser.password = await bcrypt.hash(newuser.password, parseInt(process.env.BCRYPT_SALT))

        // console.log(newuser);


        // save the object to database 
        const creatednewuser = await newuser.save();

        const response = NextResponse.json(
            newuser,
            {
                status: 201,
            }
        )

        console.log("User succesfully created");

        return response;
    }
    catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Failed to create user",
            status: false
        }, {
            status: 500,
        })
    }
}