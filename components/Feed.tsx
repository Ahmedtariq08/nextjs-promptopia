"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@models/prompt";

const Feed = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

    const handleTagClick = (tag: string) => {
        //
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                ></input>
            </form>

            <PromptCardList data={posts} handleTagClick={handleTagClick} />
        </section>
    );
};

interface PromptCardListProps {
    data: Post[];
    handleTagClick: (tag: string) => void;
}

const PromptCardList = (props: PromptCardListProps) => {
    const { data, handleTagClick } = props;

    return (
        <div className="mt-16 prompt_layout">
            {data.map((post) => (
                <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
            ))}
        </div>
    );
};

export default Feed;
