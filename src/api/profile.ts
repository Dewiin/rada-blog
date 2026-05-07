import { api } from "./client";

export async function fetchAllPublishedPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        const data = await api('/api/profile/published', {
            method: "GET"
        }, refreshToken, setError);
        
        setPosts(data?.posts || []);
    } catch (err: any) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
    } finally {
        setIsLoading(false);
    }
}

export async function fetchAllUnpublishedPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        const data = await api('/api/profile/unpublished', {
            method: "GET"
        }, refreshToken, setError);
        
        setPosts(data?.posts || []);
    } catch (err: any) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
    } finally {
        setIsLoading(false);
    }
}