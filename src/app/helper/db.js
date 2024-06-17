import mongoose from "mongoose";
import {User} from "../models/user";
// import { config } from "dotenv";


const cofig={
    isconnected:0,
}


export const ConnectDb = async () => {

    if(cofig.isconnected) return;

    try {
        const { connection } = await mongoose.connect(process.env.MONGO_DB_URL);

        console.log("db connected...");
        
        cofig.isconnected=connection.readyState;
        // console.log("User is created");


    } catch (error) {
        console.log("Failed to connect with database");
        console.log(error);
    }
};