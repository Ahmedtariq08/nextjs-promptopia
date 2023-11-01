import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

// GET a single prompt
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.url?.split("/").reverse()[0];
        if (!id) {
            return res.status(400).json("Prompt id not found");
        }
        await connectToDb();
        const prompt = await Prompt.findById(id).populate("creator");
        if (!prompt) {
            return new Response("Prompt not found", { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch prompt", { status: 500 });
    }
};

// PATCH - update a prompt
export const PATCH = async (req: NextRequest, res: NextResponse) => {
    try {
        const { prompt, tag } = await req.json();
        const id = req.url?.split("/").reverse()[0];
        await connectToDb();

        const existingPrompt = await Prompt.findById(id);
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to update prompt", { status: 500 });
    }
};

// DELETE - delete a prompt
export const DELETE = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const id = req.url?.split("/").reverse()[0];
        await connectToDb();
        await Prompt.findByIdAndRemove(id);
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to delete prompt", { status: 500 });
    }
};
