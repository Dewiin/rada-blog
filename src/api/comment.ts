import { api } from "./client";
import type { IComment } from "@/components/types/Comment";

export async function postComment(
    data: {
        content: string,
    },
    postId: string | undefined,
    setComments: Function,
    setError: Function,
    setIsSubmitting: Function,
): Promise<boolean> {
    setIsSubmitting(true);
    try {
        const result = await api(`/api/comments/${postId}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }, setError);
    
        if(result.message) {
            setComments((prev: IComment[]) => ([
                result.result,
                ...prev
            ]));
            return true;
        }
        return false;
    } finally {
        setIsSubmitting(false);
    }
}