import { Schema, model, models } from "mongoose";

export interface Post {
    prompt: string;
    tag: string;
    _id?: string;
    creator?: Record<string, any>;
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
