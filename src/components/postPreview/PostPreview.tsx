import { format } from "date-fns"
import DOMPurify from "dompurify"
import type { IPost } from "../types/Post"
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

export function PostPreview({ post }: { post: IPost }) {
    return (
        <div 
            className="flex flex-col gap-3 
            m-4
            h-fit"
        >   
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

            {/* title and subtitle */}
            <div className="flex flex-col gap-1">
                <div
                    className="text-2xl font-bold"
                    >
                    {post.title}
                </div>

                {/* subtitle */}
                <div
                    className="text-sm text-accent-foreground"
                    >
                    {post.subtitle}
                </div>
            </div>

            {/* statistics */}
            <div
                dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(post.content).substring(0, 20)
                }}
            />
            <div>
                {format(post.createdAt, "MMM dd, yyyy")}
            </div>
        </div>
    )
}