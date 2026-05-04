export async function fetchPost(
    id: string,
    setError: Function,
    setPost: Function,
    setIsLoading: Function
) {
    setIsLoading(true);
    try {
        const VITE_API_URL = import.meta.env.VITE_API_URL;
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