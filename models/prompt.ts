import { Schema, model, models } from "mongoose";

interface Creator {
    _id: string;
    email: string;
    username: string;
    image: string;
    __v: number;
}
export interface Post {
    prompt: string;
    tag: string;
    _id?: string;
    creator?: Creator;
}

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    prompt: {
        type: String,
        required: [true, "Prompt is required."],
    },
    tag: {
        type: String,
        required: [true, "Tag is required."],
    },
});

const Prompt = models.Prompt || model("Prompt", PromptSchema);

export default Prompt;
