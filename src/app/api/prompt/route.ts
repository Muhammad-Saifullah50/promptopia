import { connectToDB } from "@/utils/database"
import Prompt from "@/models/prompt/prompt"
import User from "@/models/user/user";

export const GET = async () => {
    try {
        await connectToDB();

        const prompts = await Prompt?.find({})?.populate('creator', { model: User })

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        console.error(error)
        return new Response(JSON.stringify("Failed to fetch prompts"), { status: 500 })

    }
}
