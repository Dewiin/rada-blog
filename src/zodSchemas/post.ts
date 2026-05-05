import z from "zod"

export const formSchema = z.object({
    title: z
        .string()
        .min(10, "Title must be at least 10 characters.")
        .max(100, "Title must be at most 100 characters."),
    subtitle: z
        .string()
        .min(10, "Subtitle must be at least 10 characters.")
        .max(100, "Description must be at most 100 characters."),
    content: z
        .string()
        .min(100, "Content is too short!")
});