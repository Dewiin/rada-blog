import { useState, useEffect } from "react";

// api
import { fetchAllPosts } from "@/api/posts";

// components
import { Separator } from "@/components/ui/separator";
import { PostPreview } from "@/components/postPreview/PostPreview";
import { SkeletonPostPreview } from "@/components/skeleton/SkeletonPostPreview";

// contexts
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";

// types
import type { IPost } from "@/components/types/Post";

export function HomeScreen() {
    const [ posts, setPosts ] = useState<IPost[]>([]);
    const { setError, isLoading, setIsLoading } = useUI();
    const { refreshToken } = useAuth();

    useEffect(() => {
        fetchAllPosts(setPosts, setError, setIsLoading, refreshToken);
    }, []);

    return (
        <div
            className="flex flex-col gap-4 
            my-20 md:mx-auto mx-8
            md:w-2xl"
        >
            { isLoading && Array.from({length: 3}).map((_, index) => (
                    // skeleton preview
                    <SkeletonPostPreview key={index} />
                ))
            }
            { !isLoading && posts.length > 0 && posts.map((post, index) => (
                <div
                    key={post.id}
                    className="flex flex-col gap-4"
                >
                    <PostPreview
                        post={post} 
                        showAction={false}
                    />
                    {index < posts.length-1 && <Separator />}
                </div>
            ))}
        </div>
    )
}