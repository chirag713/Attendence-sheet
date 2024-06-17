import { NextResponse } from "next/server"


export const getresponsemessage=(messagetext , statuscode , successstaus)=>{
    return NextResponse.json({
        message:messagetext,
        success:successstaus,
    },{
        status:statuscode,
    })
}