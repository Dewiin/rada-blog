import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react";
import { useNavigate } from "react-router";

export function CreatePostScreen() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user && user.role !== "AUTHOR") navigate("/403");
    });

    return (
        <>
            Create a post
        </>
    )
}