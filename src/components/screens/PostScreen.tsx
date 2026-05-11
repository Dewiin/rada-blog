import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify";

// helpers
import { fetchPost } from "@/api/posts";
import { formatDate } from "@/helpers/formatDate";

// types
import type { IPost } from "@/components/types/Post";

// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "../ui/separator";
import { SkeletonPostScreen } from "@/components/skeleton/SkeletonPostScreen";
import { FaArrowLeft, FaRegComment } from "react-icons/fa6";
import { PiHandsClappingLight } from "react-icons/pi";
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { CommentSection } from "@/components/comments/CommentSection";

// contexts
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";

export function PostScreen() {
    const { id } = useParams();
    const [ post, setPost ] = useState<IPost | null>(null);
    const { setError, isLoading, setIsLoading } = useUI();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) fetchPost(id, setIsLoading, setError, setPost);
    }, []);

    if (!isLoading && post) {
        if (!post.published && post.author.id !== user?.id) {
            return <PageForbiddenScreen />
        }
    }

    return (
        <>
            <div className="flex md:flex-row flex-col md:gap-20 gap-6 md:mx-64 md:my-24 m-12">
                <div>
                    <FaArrowLeft 
                        onClick={() => navigate(-1)}
                        size={24}  
                        className="cursor-pointer md:mt-2"
                    />
                </div>

                {/* content */}
                <div className="w-full flex flex-col gap-4">
                    {/* header */}
                    <div className="flex flex-col gap-4">

                        { isLoading && <SkeletonPostScreen /> }

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
                            <div 
                                onClick={() => navigate(`/profile/${post?.author.id}`)}
                                className="flex gap-2 items-center text-sm cursor-pointer"
                            >
                                <Avatar 
                                    size="default"
                                >
                                    <AvatarImage alt={`@${post?.author.username}`} />
                                    <AvatarFallback>{post?.author.username.substring(0,2)}</AvatarFallback>
                                </Avatar>
                                <p>
                                    <span className="hover:underline">
                                        {post?.author.username}
                                    </span>
                                    {" · "} 
                                    <span className="dark:text-stone-500 text-stone-600">
                                        {post && formatDate(post.createdAt)}
                                    </span>
                                </p>
                            </div>

                            <Separator />
                                {/* claps and comments */}
                                <div className="flex gap-8 mx-2">
                                    <div className="flex items-center gap-2">
                                        <PiHandsClappingLight />
                                        {post?.claps.length}
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
                    <div className="prose prose-sm dark:prose-invert prose-stone max-w-none">
                        <div
                            dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(post.content)
                            }}
                            className="text-lg/8"
                        />
                    </div>
                    }

                    {/* Comments */}
                    {!isLoading && <CommentSection post={post} /> }
                </div>

            </div>
        </>
    )
}