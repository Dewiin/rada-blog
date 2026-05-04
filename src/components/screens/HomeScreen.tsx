import { useState, useEffect } from "react";

// api
import { fetchAllPosts } from "@/api/fetchAllPosts";

// types
import type { IPost } from "../types/Post";

// components
import { PostPreview } from "../postPreview/PostPreview";
import { Separator } from "../ui/separator";

// contexts
import { useUI } from "@/contexts/UIContext";

export function HomeScreen() {
    const [ posts, setPosts ] = useState<IPost[]>([]);
    const { setError } = useUI();

    useEffect(() => {
        fetchAllPosts(setPosts, setError);
    }, []);

    return (
        <div
            className="flex flex-col gap-4 
            my-20 md:mx-auto mx-8
            md:w-2xl"
        >
            { posts.length > 0 && posts.map((post, index) => (
                <>
                    <PostPreview
                        key={index}
                        post={post} 
                    />
                    {index < posts.length-1 && <Separator />}
                </>
            ))}
        </div>
    )
}