// components
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { CommentActions } from "./CommentActions";

// contexts
import { useAuth } from "@/contexts/AuthContext";

// helpers
import { formatDate } from "@/helpers/formatDate";

// types
import type { IComment } from "@/components/types/Comment";

export function Comment({ comment, setComments }: { comment: IComment, setComments: Function }) {
    const { user } = useAuth();

    return (
        <div className="flex flex-col gap-2">
            {/* Comment Author */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <Avatar>
                        <AvatarImage alt={`@${comment?.user.username}`} />
                        <AvatarFallback>{comment.user.username.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm">{comment?.user.username}</p>
                        <p className="text-xs dark:text-stone-500 text-stone-600">{formatDate(comment?.createdAt)}</p>
                    </div>
                </div>
                {comment?.user.id === user?.id && 
                    <CommentActions comment={comment} setComments={setComments} />
                }
            </div>

            <p className="text-sm">{comment?.content}</p>
        </div>
    )
}