import { api } from "./client";
import type { IPost } from "@/components/types/Post";

export async function fetchAllPublishedPosts(
    setPosts: Function,
    setError: Function
) {
    const data = await api('/api/profile/published', {
        method: "GET"
    }, setError);
    
    setPosts(data?.posts || []);
}

export async function fetchAllUnpublishedPosts(
    setPosts: Function,
    setError: Function
) {
    const data = await api('/api/profile/unpublished', {
        method: "GET"
    }, setError);
        
    setPosts(data?.posts || []);
}

export async function fetchAllActivity(
    setActivity: Function,
    setError: Function,
) {
    const data = await api('/api/profile/activity', {
        method: "GET"
    }, setError);

    if(data.activity) setActivity(data.activity);
}