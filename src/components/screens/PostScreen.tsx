import { useParams, useNavigate } from "react-router"
import { useEffect, useState } from "react"
import DOMPurify from "dompurify";

// helpers
import { fetchPost } from "@/api/fetchPost";
import { formatDate } from "@/helpers/formatDate";

// types
import type { IPost } from "../types/Post";

// components
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUI } from "@/contexts/UIContext";
import { Separator } from "../ui/separator";
import { FaArrowLeft, FaRegComment } from "react-icons/fa6";
import { PiHandsClappingLight } from "react-icons/pi";

export function PostScreen() {
    const { id } = useParams();
    const [ post, setPost ] = useState<IPost | null>(null);
    const { setError } = useUI();
    const navigate = useNavigate();

    useEffect(() => {
        if(id) fetchPost(id, setError, setPost);
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
                    <p className="text-3xl font-bold">
                        {post?.title}
                    </p>
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