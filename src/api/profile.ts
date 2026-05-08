import { api } from "./client";

export async function fetchAllPublishedPosts(
    setPosts: Function,
    setError: Function,
    refreshToken: Function,
) {
    try {
        const data = await api('/api/profile/published', {
            method: "GET"
        }, refreshToken);
        
        setPosts(data?.posts || []);
    } catch (err: any) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
    }
}

export async function fetchAllUnpublishedPosts(
    setPosts: Function,
    setError: Function,
    refreshToken: Function,
) {
    try {
        const data = await api('/api/profile/unpublished', {
            method: "GET"
        }, refreshToken);
        
        setPosts(data?.posts || []);
    } catch (err: any) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
    }
}