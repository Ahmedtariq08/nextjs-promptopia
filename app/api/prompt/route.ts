import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";

export const GET = async (req: NextRequest, res: NextResponse) => {
    try {
        await connectToDb();
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
