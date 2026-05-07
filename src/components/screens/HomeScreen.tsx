import { useState, useEffect } from "react";

// api
import { fetchAllPosts } from "@/api/posts";

// components
import { Separator } from "@/components/ui/separator";
import { PostPreview } from "@/components/postPreview/PostPreview";
import { SkeletonPostPreview } from "@/components/skeleton/SkeletonPostPreview";

// contexts
import { useUI } from "@/contexts/UIContext";

// types
import type { IPost } from "@/components/types/Post";

export function HomeScreen() {
    const [ posts, setPosts ] = useState<IPost[]>([]);
    const { setError, isLoading, setIsLoading } = useUI();

    useEffect(() => {
        fetchAllPosts(setPosts, setError, setIsLoading);
    }, []);

    return (
        <div
            className="flex flex-col gap-4 
            my-20 md:mx-auto mx-8
            md:w-2xl"
        >
            { isLoading && 
                // skeleton preview
                <SkeletonPostPreview />
            }
            { !isLoading && posts.length > 0 && posts.map((post, index) => (
                <div
                    key={post.id}
                >
                    <PostPreview
                        post={post} 
                    />
                    {index < posts.length-1 && <Separator />}
                </div>
            ))}
        </div>
    )
}