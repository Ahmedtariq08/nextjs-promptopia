"use client";
import Profile from "@components/Profile";
import { Post } from "@models/prompt";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const OtherProfilePage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const userId = searchParams.get("id");
    const username = searchParams.get("name");

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        };
        if (userId) {
            fetchPosts();
        }
    }, [router, userId]);

    return userId && <Profile name={username!} desc={`Welcome to the profile of ${username}`} data={posts} />;
};

export default OtherProfilePage;
