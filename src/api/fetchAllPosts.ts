export async function fetchAllPosts(
    setPosts: Function,
    setError: Function
) {
    try {
        const VITE_API_URL = import.meta.env.VITE_API_URL;
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
    }
}