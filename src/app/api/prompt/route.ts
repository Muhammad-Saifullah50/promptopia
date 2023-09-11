import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt/prompt"

export const GET = async () => {
    try {
        await connectToDB();

        const prompts = await Prompt.find({}).populate('creator')

        return NextResponse.json(prompts, { status: 200 })
    } catch (error) {
        console.error(error)
        return NextResponse.json("Failed to fetch prompts", { status: 500 })

    }
}