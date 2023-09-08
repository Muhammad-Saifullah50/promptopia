import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt/prompt"

export const GET = async (request: NextRequest, { params }: any) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator')
        // console.log(prompts)
        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 200 })

    }
}