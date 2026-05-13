export const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
    setError?: Function,
    setSuccess?: Function,
) {
    let response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
        credentials: "include"
    });

    if(response.status === 401) {
        await fetch(`${VITE_API_URL}/api/auth/refresh`, {
            method: "POST",
            credentials: "include"
        });

        response = await fetch(`${VITE_API_URL}${path}`, {
            ...options,
            credentials: "include"
        });
    }

    let result = await response.json();
    if (!response.ok) {
        setError && setError({
            title: result?.error,
        });
        result = null;
    } else {
        setSuccess && setSuccess({
            title: result.message
        });
    }

    return result;
}

export async function fetchUser(
    setUser: Function,
    setError: Function,
    setIsLoading: Function,
) {
    setIsLoading(true);
    try {
        const user = await api('/api/auth/me', {
            method: "GET"
        }, setError);
    
        setUser(user);
    } finally {
        setIsLoading(false);
    }
}