import { NextRequest, NextResponse } from "next/server"
import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt/prompt"


type Props = {
    request: NextRequest
    params: { id: string }
}
// GET Request to read data

export const GET = async (request: NextRequest, { params }: Props) => {
    try {
        await connectToDB();

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) {
            return new Response('Propmt not found', { status: 404 })
        }

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        return new Response("Failed to fetch prompts", { status: 500 })

    }
}
// PATCH Request to update data

export const PATCH = async (request: NextRequest, { params }: Props) => {
    const { prompt, tag } = await request.json();

    try {
        await connectToDB()

        const existingPrompt = await Prompt.findById(params.id)

        if (!existingPrompt) {
            return new Response('Propmt not found', { status: 404 })
        }

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), { status: 200 })
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 })
    }
}

export const DELETE = async (request: NextRequest, { params }: Props) => {
    try {
        await connectToDB();

        await Prompt.findByIdAndRemove(params.id)

        return new Response("Prompt deleted successfully", { status: 200 })
    } catch (error) {
        return new Response("Failed to delete prompt", { status: 500 })

    }
}

