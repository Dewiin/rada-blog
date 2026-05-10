// components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// helpers
import { formatDate } from "@/helpers/formatDate";

// types
import type { IComment } from "@/components/types/Comment";

export function Comment({ comment }: { comment: IComment }) {
    return (
        <div className="flex flex-col gap-2">
            {/* Comment Author */}
            <div className="flex">
                <Avatar>
                    <AvatarImage alt={`@${comment?.user.username}`} />
                    <AvatarFallback>{comment.user.username.substring(0,2)}</AvatarFallback>
                </Avatar>
                <div>
                    <p>{comment?.user.username}</p>
                    <p>{formatDate(comment?.createdAt)}</p>
                </div>
            </div>

            <p>{comment?.content}</p>
        </div>
    )
}