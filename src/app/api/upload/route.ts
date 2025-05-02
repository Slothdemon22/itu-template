import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server"; 
import { supabase } from "@/lib/db";

export async function POST(req: Request) {
    const parsedData=await req.json();
    const user=await currentUser()
    console.log(user)
    const {data,error}=await supabase.from("itu-test-clerk")
    .insert({
        clerkID:user?.id,
        image:parsedData.image,
        title:parsedData.title,
        description:parsedData.description,
    })
    .select()
    console.log("Data : ",data)
    if(error){
        return NextResponse.json({error:error.message},{status:500})
    }
    return NextResponse.json({message:"success",data},{status:200})


}