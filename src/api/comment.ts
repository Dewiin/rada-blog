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

export async function deleteComment(
    commentId: string,
    setComments: Function, 
    setError: Function,
    setSuccess: Function,
) {
    const result = await api(`/api/comments/${commentId}`, {
        method: "DELETE"
    }, setError, setSuccess);

    if(result.message) {
        setComments((prev: IComment[]) => (
            prev.filter((comment: IComment) => comment.id !== parseInt(commentId))
        ));
    }
}

export async function updateComment(
    data: {
        content: string,
    },
    commentId: string,
    setComments: Function,
    setError: Function,
    setisSubmitting: Function
) {
    setisSubmitting(true);
    try {
        const result = await api(`/api/comments/${commentId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {"Content-Type": "application/json"}
        }, setError);
        
        if(result.comment) {
            setComments((prev: IComment[]) => (
                prev.map((comment) => {
                    if(comment.id.toLocaleString() === commentId) {
                        return {
                            ...comment,
                            content: data.content,
                        }
                    }

                    return comment;
                })
            ));
        };
    } finally {
        setisSubmitting(false);
    }
}