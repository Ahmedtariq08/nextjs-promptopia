// Setup providers such as google providers

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { connectToDb } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
    ],
    callbacks: {
        async session({ session }) {
            if (session.user == null) {
                return session;
            }
            const sessionUser = await User.findOne({
                email: session.user.email,
            });

            session.user!.id = sessionUser._id.toString();
            return session;
        },
        async signIn({ profile }) {
            if (profile == null) {
                return false;
            }
            try {
                await connectToDb();

                const userExists = await User.findOne({
                    email: profile.email,
                });

                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: (profile.name ?? "_NoUsername_").replace(" ", "").toLowerCase(),
                        image: (profile as any).picture,
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
