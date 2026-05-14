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

    const activity = [...(data.clapsActivity || []), ...(data.commentsActivity || [])].sort(
        (a: IPost, b: IPost) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );

    setActivity(activity);
}