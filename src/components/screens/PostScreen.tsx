import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify";

// helpers
import { fetchPost } from "@/api/posts";
import { formatDate } from "@/helpers/formatDate";

// types
import type { IPost } from "../types/Post";

// contexts
import { useUI } from "@/contexts/UIContext";

// components
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { Separator } from "../ui/separator";
import { FaArrowLeft, FaRegComment } from "react-icons/fa6";
import { PiHandsClappingLight } from "react-icons/pi";

export function PostScreen() {
    const { id } = useParams();
    const [ post, setPost ] = useState<IPost | null>(null);
    const { setError, isLoading, setIsLoading } = useUI();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) fetchPost(id, setError, setPost, setIsLoading);
    }, []);

    return (
        <div className="flex md:flex-row flex-col md:gap-20 gap-6 md:mx-64 md:my-24 m-12">
            <div>
                <FaArrowLeft 
                    onClick={() => navigate(-1)}
                    size={24}  
                    className="cursor-pointer md:mt-2"
                />
            </div>

            {/* content */}
            <div className="w-full flex flex-col gap-12">
                {/* header */}
                <div className="flex flex-col gap-4">

                    { isLoading && 
                    <>
                        {/* title */}
                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-8 md:w-[85%] rounded-full" /> 
                            <Skeleton className="h-8 md:w-[70%] w-[85%] rounded-full" /> 
                        </div>

                        <div className="flex flex-col gap-2">
                            <Skeleton className="h-4 w-[80%] rounded-full" />
                            <Skeleton className="h-4 w-[70%] rounded-full" />
                        </div>

                        <div className="flex gap-2 items-center">
                            <Skeleton className="h-8 w-8 rounded-full" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                            <Skeleton className="h-4 w-20 rounded-full" />
                        </div>

                        <Separator />
                                <Skeleton className="h-4 w-30 rounded-full" />
                        <Separator />
                    </>
                    }

                    { !isLoading && 
                    <>
                        {/* title */}
                        <p className="text-3xl font-bold">
                            {post?.title}
                        </p>

                        {/* subtitle */}
                        <p className="dark:text-stone-500 text-stone-600">
                            {post?.subtitle}
                        </p>

                        {/* author */}
                        <div className="flex gap-2 items-center text-sm">
                            <Avatar size="default">
                                <AvatarImage alt={`@${post?.author.username}`} />
                                <AvatarFallback>{post?.author.username.substring(0,2)}</AvatarFallback>
                            </Avatar>
                            <p>
                                {post?.author.username} · <span className="dark:text-stone-500 text-stone-600">{post && formatDate(post.createdAt)}</span>
                            </p>
                        </div>

                        <Separator />
                            {/* claps and comments */}
                            <div className="flex gap-8 mx-2">
                                <div className="flex items-center gap-2">
                                    <PiHandsClappingLight />
                                    {post?.claps}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaRegComment />
                                    {post?.comments.length}
                                </div>
                            </div>
                        <Separator />
                    </>
                    }
                </div>

                {/* body */}
                {post && 
                <div
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.content)
                    }}
                    className="text-lg/8"
                />
                }
            </div>
        </div>
    )
}