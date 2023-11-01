import { Post } from "@models/prompt";
import React from "react";

interface Props {
    name: string;
    desc: string;
    data: Post[];
    handleEdit: () => void;
    handleDelete: () => void;
}

const Profile = (props: Props) => {
    const { name, desc, data, handleDelete, handleEdit } = props;

    return (
        <section className="w-full">
            <h1>{name} Profile</h1>
        </section>
    );
};

export default Profile;
