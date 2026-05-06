const VITE_API_URL = import.meta.env.VITE_API_URL;

export async function fetchAllPublishedPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        let response = await fetch(`${VITE_API_URL}/api/profile/published`, {
            method: "GET",
            credentials: "include",
        });

        if(response.status === 401) {
            console.log("refreshing");
            await refreshToken();
            response = await fetch(`${VITE_API_URL}/api/profile/published`, {
                method: "GET",
                credentials: "include",
            });
        }
        
        const result = await response.json();
        if(!response.ok) {
            setError({
                title: "Error getting a response.",
                description: "Please try again later."
            });
            return;
        } 
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

export async function fetchAllUnpublishedPosts(
    setPosts: Function,
    setError: Function,
    setIsLoading: Function,
    refreshToken: Function
) {
    setIsLoading(true);
    try {
        let response = await fetch(`${VITE_API_URL}/api/profile/unpublished`, {
            method: "GET",
            credentials: "include",
        });

        if(response.status === 401) {
            console.log("refreshing");
            await refreshToken();
            response = await fetch(`${VITE_API_URL}/api/profile/unpublished`, {
                method: "GET",
                credentials: "include",
            });
        }

        const result = await response.json();
        if(!response.ok) {
            setError({
                title: "Error getting a response.",
                description: "Please try again later."
            });
            return;
        } 
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