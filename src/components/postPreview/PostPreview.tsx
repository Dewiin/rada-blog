import { useNavigate } from "react-router"

// types
import type { IPost } from "@/components/types/Post"

// components
import { PostActions } from "./PostActions";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { RiGeminiFill } from "react-icons/ri";
import { FaComment } from "react-icons/fa6";
import { PiHandsClappingFill } from "react-icons/pi";

// helpers
import { formatDate } from "@/helpers/formatDate";

export function PostPreview({ post }: { post: IPost }) {
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col gap-4 m-4 h-fit cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
        >   
            <div className="flex justify-between items-center">
                {/* author */}
                <div 
                    className="flex gap-2"
                >
                    <Avatar size="sm">
                        <AvatarImage alt={`@${post.author.username}`} />
                        <AvatarFallback>{post.author.username.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <p>{post.author.username}</p>
                </div>
                <PostActions />
            </div>

            {/* title and subtitle */}
            <div className="flex flex-col gap-1">
                <div
                    className="text-2xl font-bold"
                    >
                    {post.title}
                </div>

                {/* subtitle */}
                <div
                    className="dark:text-stone-500 text-stone-600"
                    >
                    {post.subtitle}
                </div>
            </div>

            {/* statistics */}
            <div
                className="flex gap-6"
            >
                {/* date created */}
                <div className="flex items-center gap-2 dark:text-stone-500 text-stone-600">
                    <RiGeminiFill className="text-yellow-500" />
                    <p className="text-sm">
                        {formatDate(post.createdAt)}
                    </p>
                </div>

                {/* claps/upvotes */}
                <div className="flex items-center gap-2 dark:text-stone-500 text-stone-600">
                    <PiHandsClappingFill />
                    {post.claps.length}
                </div>

                {/* comments */}
                <div className="flex items-center gap-2 dark:text-stone-500 text-stone-600">
                    <FaComment />
                    {post.comments.length}
                </div>
            </div>
        </div>
    )
}