import type { IUser } from "@/components/types/User";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function
) {
    setIsLoading(true);
    try {
        const response = await fetch(`${VITE_API_URL}/api/posts`, {
            method: "GET",
            credentials: "include",
        });
        
        if(!response.ok) {
            setError({
                title: "Error getting a response.",
                description: "Please try again later."
            });
            return;
        } 
        const result = await response.json();
        setPosts(result.posts);
    } catch (err: any) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
    } finally {
        setIsLoading(false);
    }
}

export async function fetchPost(
    id: string,
    setError: Function,
    setPost: Function,
    setIsLoading: Function
) {
    setIsLoading(true);
    try {
        const response = await fetch(`${VITE_API_URL}/api/posts/${id}`, {
            method: "GET",
            credentials: "include",
        });

        if(!response.ok) {
            setError({
                title: "Error getting a response.",
                description: "Please try again later."
            });
            return;
        } 
        const result = await response.json();
        setPost(result.post);
    } catch (err) {
        setError({
            title: "Server error",
            description: "Please try again later."
        });
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
        
        let response = await fetch(`${VITE_API_URL}/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });
        
        if(response.status === 401) {
            await refreshToken();
            response = await fetch(`${VITE_API_URL}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });
        }  

        const result = await response.json();
        if(!response.ok) {
            setError({
                title: result.error,
                description: "Please try again."
            });
        } else {
            setSuccess({
                title: result.message,
                description: "View the new post on the home page."
            })
        }
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
        
        let response = await fetch(`${VITE_API_URL}/api/posts`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
            credentials: "include",
        });
        if(response.status === 401) {
            await refreshToken();
            response = await fetch(`${VITE_API_URL}/api/posts`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
                credentials: "include",
            });
        }
        const result = await response.json();
        
        if(!response.ok) {
            setError({
                title: result.error,
                description: "Please try again."
            });
        } else {
            setSuccess({
                title: result.message,
                description: "View saved posts in your profile."
            });
        }
    } finally {
        setIsLoading(false);
    }
}