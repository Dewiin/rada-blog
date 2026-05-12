import { api } from "./client";

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

    console.log(data.clapsActivity);
    console.log(data.commentsActivity);
    setActivity([...data.clapsActivity, ...data.commentsActivity]).sort(
        (a: any, b: any) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
    );
}