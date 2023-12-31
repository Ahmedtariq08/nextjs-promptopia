"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";
import { Post } from "@models/prompt";

const ProfilePage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState<Post[]>([]);
    const userId = session?.user.id;
    const isUserSignedIn = userId != null;

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${userId}/posts`);
            const data = await response.json();
            setPosts(data);
        };
        if (isUserSignedIn) {
            fetchPosts();
        } else {
            router.push("/");
        }
    }, [isUserSignedIn, router, userId]);

    const handleEdit = (post: Post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post: Post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id?.toString()}`, {
                    method: "DELETE",
                });
                const filteredPosts = posts.filter((p) => p._id !== post._id);
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        isUserSignedIn && (
            <Profile
                name="My"
                desc="Welcome to your personalized profile page"
                data={posts}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
            />
        )
    );
};

export default ProfilePage;
