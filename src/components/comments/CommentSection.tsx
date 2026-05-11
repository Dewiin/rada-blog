import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// api
import { postComment } from "@/api/comment";

// components
import {
    Field,
    FieldError,
} from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Comment } from "./Comment";

// contexts
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";

// schemas
import { commentSchema } from "@/zodSchemas/comment";

// types
import type { IPost } from "@/components/types/Post";
import type { IComment } from "@/components/types/Comment";

export function CommentSection({ post }: { post: IPost | null }) {
    const [startCommenting, setStartCommenting] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [comments, setComments] = useState<IComment[]>(post?.comments || []);
    const { user } = useAuth();
    const { setError } = useUI();

    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: "",
        },
        mode: "onChange",
    });
    
    async function onSubmit(data: z.infer<typeof commentSchema>) {
        const comment = {
            content: data.comment,
            userId: user?.id,
        }
        await postComment(comment, post?.id.toLocaleString(), setComments, setError, setIsSubmitting);
    }

    return (
        <div className="flex flex-col gap-8 mt-24">
            <Separator />

            {/* Header */}
            <p className="font-semibold text-2xl">
                Discussion ({post?.comments.length})
            </p>

            {/* What are your thoughts?  */}
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col gap-3"
            >
                <div className="flex items-center gap-2">
                    <Avatar>
                        <AvatarImage alt={`@${user?.username}`} />
                        <AvatarFallback>{user?.username.substring(0,2)}</AvatarFallback>
                    </Avatar>
                    <p>{user?.username}</p>
                </div>
                
                <Controller
                    name="comment"
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    placeholder={user ? "What are your thoughts?" : "Sign in to comment"}
                                    disabled={isSubmitting || !user}
                                    className={`resize-none transition-all duration-500 ease-out ${
                                        startCommenting ? "min-h-[120px]" : "min-h-[40px]"
                                        }`}
                                        aria-invalid={fieldState.invalid}
                                        onFocus={() => setStartCommenting(true)}
                                        onBlur={(e) => {
                                            if (!e.target.value.trim()) {
                                                setStartCommenting(false);
                                            }
                                        }}
                                        />
                                {startCommenting &&
                                <>
                                    <InputGroupAddon align="block-end">
                                        <InputGroupText>
                                            {field.value.length}/1000 characters
                                        </InputGroupText>
                                        <InputGroupButton 
                                            size="sm"
                                            type="submit"
                                            variant="default"
                                            disabled={isSubmitting} 
                                            className="ml-auto cursor-pointer"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                            }}    
                                            >
                                            Post
                                        </InputGroupButton>    
                                    </InputGroupAddon>
                                </>
                                }
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                    />
            </form>

            <Separator />

            {comments.map((comment: IComment) => (
                <Comment comment={comment} />
            ))}
        </div>
    )
}