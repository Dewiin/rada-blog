import { useState, useEffect } from "react";

// api
import { fetchAllPosts } from "@/api/posts";

// types
import type { IPost } from "../types/Post";

// components
import { PostPreview } from "../postPreview/PostPreview";
import { Separator } from "../ui/separator";

// contexts
import { useUI } from "@/contexts/UIContext";
import { Skeleton } from "../ui/skeleton";

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
                <div 
                    className="flex flex-col gap-4 m-4 h-fit"
                >   
                    {/* author */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className="h-6 w-6 rounded-full" />
                        <Skeleton className="h-4 w-20 rounded-full" />
                    </div>

                    {/* title and subtitle */}
                    <div className="flex flex-col gap-2">
                        {/* title */}
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-6 md:w-[85%] rounded-full" />
                            <Skeleton className="h-6 md:w-[70%] w-[85%] rounded-full" />
                        </div>

                        {/* subtitle */}
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-3 w-[90%] rounded-full" />
                            <Skeleton className="h-3 w-[60%] rounded-full" />
                        </div>
                    </div>

                    <Skeleton className="h-4 md:w-60 w-30 rounded-full" />
                </div>
            }
            { !isLoading && posts.length > 0 && posts.map((post, index) => (
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