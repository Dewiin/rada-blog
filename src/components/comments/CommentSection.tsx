import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// api
import { postComment } from "@/api/comment";

// components
import { Field, FieldError } from "@/components/ui/field"
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";
import { UserAvatar } from "@/components/avatar/UserAvatar";
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

export function CommentSection({ post, isDrawer=false }: { post: IPost | null, isDrawer?: boolean }) {
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

    const { reset } = form;
    
    async function onSubmit(data: z.infer<typeof commentSchema>) {
        const comment = {
            content: data.comment.trim(),
        }
        const result = await postComment(comment, post?.id.toLocaleString(), setComments, setError, setIsSubmitting);
        if(result) reset();
    }

    return (
        <div className={`flex flex-col gap-8 ${isDrawer && "m-8"} overflow-y-auto no-scrollbar`}>
            {/* Header */}
            <p className="font-semibold text-2xl">
                Discussion ({post?.comments.length})
            </p>

            { isDrawer && <Separator /> }

            {/* What are your thoughts?  */}
            <form
                onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col gap-3"
            >
                <div className="flex items-center gap-2 text-sm">
                    <UserAvatar user={user} />
                    <p>{user?.displayName}</p>
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

            {comments.map((comment: IComment, index) => (
                <Comment 
                    key={index}
                    comment={comment} 
                    setComments={setComments}
                />
            ))}
        </div>
    )
}