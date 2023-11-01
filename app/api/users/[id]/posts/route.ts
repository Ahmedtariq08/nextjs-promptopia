import { connectToDb } from "@utils/database";
import { NextRequest, NextResponse } from "next/server";
import Prompt from "@models/prompt";

// GET prompts for specific user
export const GET = async (req: NextRequest, res: NextResponse, data: any) => {
    try {
        const params = data.params;
        await connectToDb();
        console.log(params);
        const prompts = await Prompt.find({
            creator: params.id,
        }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
