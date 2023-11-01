"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { Post } from "@models/prompt";

const ProfilePage = () => {
    const { data: session } = useSession();
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const userId = session?.user.id;
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        };
        if (session?.user.id) {
            fetchPosts();
        }
    }, [session?.user.id]);

    const handleEdit = () => {
        //
    };

    const handleDelete = () => {
        //
    };

    return (
        <Profile
            name="My"
            desc="Welcome to your personalized profile page"
            data={[]}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    );
};

export default ProfilePage;
