// api
import { deleteComment } from "@/api/comment";

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

type CommentActionsProps = {
    comment: IComment,
    setComments: Function,
    setIsEditing: Function,
    form: any
}

export function CommentActions( { comment, setComments, setIsEditing, form }: CommentActionsProps) {
    const { setError, setSuccess } = useUI();

    async function onDeleteSubmit() {
        await toast.promise(
            deleteComment(comment.id.toLocaleString(), setComments, setError, setSuccess),
            { loading: "Deleting comment..." }
        );
    }

    async function onUpdateSubmit() {
        setIsEditing(true);

        form.reset({
            comment: comment.content
        });
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
                            onSelect={(e) => {
                                e.preventDefault();
                                onUpdateSubmit();
                            }}
                        >
                            <PencilIcon />
                            Edit
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem 
                            onSelect={(e) => {
                                e.preventDefault();
                                onDeleteSubmit();
                            }}
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