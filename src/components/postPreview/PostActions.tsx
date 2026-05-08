// api
import { deletePost, updatePost } from "@/api/posts";

// components
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HiDotsHorizontal } from "react-icons/hi";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

// contexts
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";

export function PostActions( { postId }: { postId: string } ) {
    const { setIsLoading, setError, setSuccess } = useUI();
    const { refreshToken } = useAuth();

    async function onDeleteSubmit() {
        await deletePost(postId, setIsLoading, setError, setSuccess, refreshToken);
    }

    async function onUpdateSubmit() {
        await updatePost(postId, setIsLoading, setError, setSuccess, refreshToken);
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <HiDotsHorizontal size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                    onClick={(e) => e.stopPropagation()}
                >
                    <DropdownMenuGroup>
                        <DropdownMenuItem
                            onClick={() => onUpdateSubmit()}
                        >
                            <PencilIcon />
                            Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => console.log("share")}
                        >
                            <ShareIcon />
                            Share
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