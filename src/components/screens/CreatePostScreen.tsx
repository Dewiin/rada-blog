import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router";

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