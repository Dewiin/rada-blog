const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function api(
    path: string,
    options: RequestInit = {},
    refreshToken: Function,
    setError?: Function,
) {
    let response = await fetch(`${VITE_API_URL}${path}`, {
        ...options,
        credentials: "include"
    });

    if(response.status === 401) {
        await refreshToken();
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
    }

    return result;
}