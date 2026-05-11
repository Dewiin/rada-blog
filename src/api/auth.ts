import { api } from "./client";

export async function signup(
    data: {
        username: string,
        password: string, 
        confirmPassword: string
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    getUser: Function,
) {
    setIsLoading(true);
    try {
        await api('/api/auth/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }, setError, setSuccess);
        getUser();
    } finally {
        setIsLoading(false);
    }
}   
    
export async function login(
    data: {
        username: string,
        password: string,
    },
    setIsLoading: Function,
    setError: Function,
    setSuccess: Function,
    getUser: Function,
) {
    setIsLoading(true);
    try {
        await api('/api/auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        }, setError, setSuccess);
        getUser();
    } finally {
        setIsLoading(false);
    }
}

export async function logout(
    setIsLoading: Function,
    setUser: Function,
    setError: Function,
    setSuccess: Function,
) {
    setIsLoading(true);
    try {
        const result = await api('/api/auth/logout', {
            method: "POST",
        }, setError, setSuccess);
        
        if(result.message) setUser(null);
    } finally {
        setIsLoading(false);
    }
}