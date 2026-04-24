import { useAuth } from "@/contexts/AuthContext"

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";

export function CreatePostScreen() {
    const { user } = useAuth();

    return (
        <>
        {user && user.role === "AUTHOR" ?
            <div>
                Create a post
            </div>
            :
            <PageForbiddenScreen />
        }
        </>
    )
}