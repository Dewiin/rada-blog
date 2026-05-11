// api
import { deleteComment, updateComment } from "@/api/comment";

// components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "sonner";
import { HiDotsHorizontal } from "react-icons/hi";
import { PencilIcon, TrashIcon } from "lucide-react"

// contexts
import { useUI } from "@/contexts/UIContext";

// types
import type { IComment } from "@/components/types/Comment";

export function CommentActions( { comment, setComments }: { comment: IComment, setComments: Function } ) {
    const { setError, setSuccess } = useUI();

    async function onDeleteSubmit() {
        await toast.promise(
            deleteComment(comment.id.toLocaleString(), setComments, setError, setSuccess),
            { loading: "Deleting comment..." }
        );
    }

    async function onUpdateSubmit() {
        // await updateComment
    }

    return (
        <>  
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <HiDotsHorizontal />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() => onUpdateSubmit()}
                            >
                            <PencilIcon />
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem 
                            onClick={() => onDeleteSubmit()}
                            variant="destructive"
                            >
                            <TrashIcon />
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}