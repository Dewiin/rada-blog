import DOMPurify from "dompurify"
import { format, formatDistanceToNowStrict, differenceInDays, isThisYear } from "date-fns"
import { useNavigate } from "react-router"

// types
import type { IPost } from "../types/Post"

// components
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar"

export function PostPreview({ post }: { post: IPost }) {
    const navigate = useNavigate();

    function formatPostDate(date: Date) {
        const daysAgo = differenceInDays(new Date(), date);

        if (daysAgo <= 7) {
            return formatDistanceToNowStrict(date, { addSuffix: true });
        }

        if (isThisYear(date)) {
            return format(date, "MMM dd");
        }

        return format(date, "MMM dd, yyyy");
    }

    return (
        <div 
            className="flex flex-col gap-3 m-4 h-fit cursor-pointer"
            onClick={() => navigate(`/post/${post.id}`)}
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
                {formatPostDate(post.createdAt)}
            </div>
        </div>
    )
}