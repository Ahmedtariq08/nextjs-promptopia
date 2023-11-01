"use client";
import React from "react";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Post } from "@models/prompt";

const Feed = () => {
    const [allPosts, setAllPosts] = useState<Post[]>([]);

    // Search states
    const [searchText, setSearchText] = useState("");
    const [searchTimeout, setSearchTimeout] = useState<any>(null);
    const [searchedResults, setSearchedResults] = useState<Post[]>([]);

    const fetchPosts = async () => {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setAllPosts(data);
        setSearchedResults(data);
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const filterPrompts = (searchtext: string) => {
        const regex = new RegExp(searchtext, "i"); // 'i' flag for case-insensitive search
        return allPosts.filter(
            (post) => regex.test(post.creator?.username) || regex.test(post.tag) || regex.test(post.prompt),
        );
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        clearTimeout(searchTimeout);
        setSearchText(e.target.value);

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value);
                setSearchedResults(searchResult);
            }, 500),
        );
    };

    const handleTagClick = (tagName: string) => {
        setSearchText(tagName);

        const searchResult = filterPrompts(tagName);
        setSearchedResults(searchResult);
    };

    return (
        <section className="feed">
            <form className="relative w-full flex-center">
                <input
                    type="search"
                    placeholder="Search for a tag or a username"
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    spellCheck={false}
                    className="search_input peer"
                ></input>
            </form>

            <PromptCardList data={searchedResults} handleTagClick={handleTagClick} />
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
