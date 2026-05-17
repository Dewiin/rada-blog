import { useNavigate } from "react-router"

// components
import { PostActions } from "./PostActions";
import { UserAvatar } from "@/components/avatar/UserAvatar";
import { RiGeminiFill } from "react-icons/ri";
import { FaComment } from "react-icons/fa6";
import { PiHandsClappingFill } from "react-icons/pi";

// helpers
import { formatDate } from "@/helpers/formatDate";
import { aggregateClaps } from "@/helpers/aggregateClaps";

// types
import type { IPost } from "@/components/types/Post"

export function PostPreview({ post, setPosts=()=>{}, showAction=true }: { post: IPost, setPosts?: Function, showAction?: boolean }) {
    const navigate = useNavigate();

    return (
        <div 
            className="flex flex-col gap-4 m-4 h-fit cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
        >   
            <div className="flex justify-between items-center">
                {/* author */}
                <div className="flex gap-2">
                    <UserAvatar user={post.author} size="sm" />
                    <p> {post.author.displayName} </p>
                </div>
                {showAction && 
                    <PostActions post={post} setPosts={setPosts} />
                }
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
                    {aggregateClaps(post.claps)}
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