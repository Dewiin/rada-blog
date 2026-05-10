import z from "zod"

export const commentSchema = z.object({
    comment: z
        .string()
        .min(1, "Comment can not be empty.")
        .max(1000, "Comment must be at most 1000 characters."),
});