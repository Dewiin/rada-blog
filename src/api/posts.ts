import { api } from "./client";
import type { IUser } from "@/components/types/User";

export async function fetchAllPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
    refreshToken: Function,
) {
    setIsLoading(true);
    try {
        const result = await api('/api/posts', {
            method: "GET",
        }, refreshToken, setError);
        
        setPosts(result.posts);
    } finally {
        setIsLoading(false);
    }
}

export async function fetchPost(
    id: string,
    setIsLoading: Function,
    refreshToken: Function,
    setError: Function,
    setPost: Function,
) {
    setIsLoading(true);
    try {
        const result = await api(`/api/posts/${id}`, {
            method: "GET",
        }, refreshToken, setError);

        setPost(result.post);
    } finally {
        setIsLoading(false);
    }
}

export async function createPost(data: {
        title: string,
        subtitle: string,
        content: string
    },
    setIsLoading: Function,
    refreshToken: Function,
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
        }, refreshToken, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}

export async function savePost(data: {
        title: string,
        subtitle: string,
        content: string
    },
    setIsLoading: Function,
    refreshToken: Function, 
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
        }, refreshToken, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}

export async function deletePost(
    postId: string,
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        await api(`/posts/${postId}`, {
            method: "DELETE",
        }, refreshToken, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}

export async function updatePost(
    postId: string,
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        await api(`/api/posts/${postId}`, {
            method: "PUT"
        }, refreshToken, setError, setSuccess);
    } finally {
        setIsLoading(false);
    }
}