import { connectToDb } from "@utils/database";
import Prompt from "@models/prompt";
import { NextApiRequest, NextApiResponse } from "next";

// GET prompts for specific user
export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // const { id } = req.query; this is not working
        const id = req.url?.split("/").reverse()[1];
        if (!id) {
            return res.status(400).json("User id not found");
        }
        await connectToDb();
        const prompts = await Prompt.find({
            creator: id,
        }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
};
