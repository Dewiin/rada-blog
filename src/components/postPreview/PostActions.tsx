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
import { toast } from "sonner";
import { HiDotsHorizontal } from "react-icons/hi";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react"

// contexts
import { useUI } from "@/contexts/UIContext";
import { useAuth } from "@/contexts/AuthContext";

// screens
import { EditPostScreen } from "@/components/screens/EditPostScreen";

// types
import type { IPost } from "@/components/types/Post";

export function PostActions( { post, setPosts }: { post: IPost, setPosts: Function } ) {
    const { setError, setSuccess } = useUI();
    const { refreshToken } = useAuth();

    async function onDeleteSubmit() {
        await toast.promise(
            deletePost(post.id.toLocaleString(), setPosts, setError, setSuccess, refreshToken),
            { loading: "Deleting post..." }
        );
    }

    async function onUpdateSubmit() {
        // await updatePost(post.id.toLocaleString(), setIsLoading, setError, setSuccess, refreshToken);
        return <EditPostScreen />
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