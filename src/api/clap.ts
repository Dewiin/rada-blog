import { api } from "./client";

export async function postClap(
    postId: string,
    setClaps: Function,
    setError: Function
) {
    const result = await api(`/api/posts/${postId}/clap`, {
        method: "POST"
    }, setError);

    if(result.message) setClaps((prev: number) => prev + 1);
}