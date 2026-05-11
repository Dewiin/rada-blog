import { api } from "./client";
import type { IUser } from "@/components/types/User";
import type { IPost } from "@/components/types/Post";

export async function fetchAllPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
) {
    setIsLoading(true);
    try {
        const result = await api('/api/posts', {
            method: "GET",
        }, setError);
        
        setPosts(result.posts);
    } finally {
        setIsLoading(false);
    }
}

export async function fetchPost(
    id: string,
    setIsLoading: Function,
    setError: Function,
    setPost: Function,
) {
    setIsLoading(true);
    try {
        const result = await api(`/api/posts/${id}`, {
            method: "GET",
        }, setError);

        setPost(result.post);
    } finally {
        setIsLoading(false);
    }
}

export async function createPost(
    data: {
        title: string,
        subtitle: string,
        content: string
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    user: IUser | null,
) {
    setIsLoading(true);
    try {
        const body = {
            ...data,
            published: true,
            authorId: user?.id
        };
        
        await api('/api/posts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}

export async function savePost(
    data: {
        title: string,
        subtitle: string,
        content: string
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    user: IUser | null
) {
    setIsLoading(true);
    try {
        const body = {
            ...data,
            published: false,
            authorId: user?.id
        };
        
        await api('/api/posts', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        }, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}

export async function deletePost(
    postId: string,
    setPosts: Function,
    setError: Function,
    setSuccess: Function
) {
    const result = await api(`/api/posts/${postId}`, {
        method: "DELETE",
    }, setError, setSuccess);

    if(result) {
        setPosts((prev: IPost[]) => (
            prev.filter((post) => post.id !== parseInt(postId))
        ));
    }
}

export async function updatePost(
    postId: string,
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
) {
    setIsLoading(true);
    try {
        await api(`/api/posts/${postId}`, {
            method: "PUT"
        }, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}
