import { Post } from "@models/prompt";
import React from "react";
import PromptCard from "./PromptCard";

interface Props {
    name: string;
    desc: string;
    data: Post[];
    handleEdit?: (post: Post) => void;
    handleDelete?: (post: Post) => void;
}

const Profile = (props: Props) => {
    const { name, desc, data, handleDelete, handleEdit } = props;

    return (
        <section className="w-full">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{name} Profile </span>
            </h1>
            <p className="desc text-left">{desc}</p>
            <div className="mt-16 prompt_layout">
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </section>
    );
};

export default Profile;
