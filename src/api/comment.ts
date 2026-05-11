import { api } from "./client";
import type { IComment } from "@/components/types/Comment";

export async function postComment(
    data: {
        content: string,
        userId?: string,
    },
    postId: string | undefined,
    setComments: Function,
    setError: Function,
    setIsSubmitting: Function,
) {
    setIsSubmitting(true);
    try {
        const result = await api(`/api/comments/${postId}`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: { "Content-Type": "application/json" }
        }, setError);
    
        if(result.comment) {
            setComments((prev: IComment[]) => ([
                result.comment,
                ...prev
            ]));
        }
    } finally {
        setIsSubmitting(false);
    }
}