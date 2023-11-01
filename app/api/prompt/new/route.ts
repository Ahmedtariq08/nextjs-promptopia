import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";

export const POST = async (req: NextRequest, res: NextResponse) => {
    const { userId, prompt, tag } = await req.json();

    try {
        await connectToDb();
        const newPrompt = new Prompt({
            creator: userId,
            tag: tag,
            prompt: prompt,
        });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {
            status: 201,
        });
    } catch (error) {
        console.log(error);
        return new Response("Failed to create new prompt", { status: 500 });
    }
};
