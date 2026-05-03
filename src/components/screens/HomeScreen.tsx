import { useState, useEffect } from "react";

// api
import { fetchAllPosts } from "@/api/fetchAllPosts";

// types
import type { IPost } from "../types/Post";
import type { IError } from "../types/Error";

// components
import { PostPreview } from "../postPreview/PostPreview";
import { toast } from "sonner";
import { Separator } from "../ui/separator";

export function HomeScreen() {
    const [ posts, setPosts ] = useState<IPost[]>([]);
    const [ error, setError ] = useState<IError>();
    
    useEffect(() => {
        if(error) {
            toast.warning(error?.title, {
                description: error?.description
            });
        }
    }, [error]);

    useEffect(() => {
        fetchAllPosts(setPosts, setError);
    }, []);


    return (
        <div
            className="flex flex-col gap-4 
            my-20 md:mx-auto mx-8
            md:w-2xl"
        >
            { posts.length > 0 && posts.map((post, _) => (
                <>
                    <PostPreview
                        key={_}
                        post={post} 
                    />
                    {_ < posts.length-1 && <Separator />}
                </>
            ))}
        </div>
    )
}