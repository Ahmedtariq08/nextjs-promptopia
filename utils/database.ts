import mongoose from "mongoose";

let isConnected = false; // track connection status

export const connectToDb = async () => {
    mongoose.set("strictQuery", true);

    if (isConnected) {
        console.log("mongo db is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI!, {
            dbName: "share_prompt",
        });
        isConnected = true;
        console.log("mongodb connected");
    } catch (error) {
        console.log(error);
    }
};
