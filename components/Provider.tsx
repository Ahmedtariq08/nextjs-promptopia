"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

interface ProviderProps {
    children: React.ReactNode;
    session: Session | null;
}

const Provider = (props: ProviderProps) => {
    const { children, session } = props;
    return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
