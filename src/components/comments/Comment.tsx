import { useState, useRef, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

// api
import { updateComment } from "@/api/comment";

// components
import { Field, FieldError } from "@/components/ui/field"
import { UserAvatar } from "@/components/avatar/UserAvatar";
import { CommentActions } from "./CommentActions";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupText,
    InputGroupTextarea,
} from "@/components/ui/input-group";

// contexts
import { useAuth } from "@/contexts/AuthContext";
import { useUI } from "@/contexts/UIContext";

// helpers
import { formatDate } from "@/helpers/formatDate";

// schemas
import { commentSchema } from "@/zodSchemas/comment";

// types
import type { IComment } from "@/components/types/Comment";

export function Comment({ comment, setComments }: { comment: IComment, setComments: Function }) {
    const { user } = useAuth();
    const { setError } = useUI();
    const [expanded, setExpanded] = useState<boolean>(false);
    const [shouldTruncate, setShouldTruncate] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const textRef = useRef<HTMLParagraphElement>(null);
    const form = useForm<z.infer<typeof commentSchema>>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            comment: "",
        },
        mode: "onChange",
    });

    useEffect(() => {
        const el = textRef.current;

        if (el) {
            setShouldTruncate(el.scrollHeight > el.clientHeight);
        }
    }, [comment]);

    async function onUpdateSubmit(data: z.infer<typeof commentSchema>) {
        const body = { 
            content: data.comment.trim()
        }
        await updateComment(body, comment.id.toLocaleString(), setComments, setError, setIsSubmitting);
        setIsEditing(false);
    }

    function onCancelSubmit() {
        setIsEditing(false);
    }

    return (
        <div className="flex flex-col gap-2">
            {/* Comment Author */}
            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <UserAvatar user={comment.user} />
                    <div>
                        <p className="text-sm">{comment.user.displayName}</p>
                        <p className="text-xs dark:text-stone-500 text-stone-600">{formatDate(comment.createdAt)}</p>
                    </div>
                </div>
                {comment.user.id === user?.id && !isEditing &&
                    <CommentActions 
                        comment={comment} 
                        setComments={setComments} 
                        setIsEditing={setIsEditing}
                        form={form} 
                    />
                }
            </div>
            
            {!isEditing && 
            <div className="flex flex-col gap-2 text-sm">
                <p 
                ref={textRef}
                className={`whitespace-pre-wrap ${!expanded && "line-clamp-3"}`}
                >
                    {comment.content}
                </p>
                {shouldTruncate && 
                    <p 
                    className="hover:underline dark:text-stone-500 text-stone-600 cursor-pointer"
                    onClick={() => setExpanded(!expanded)}
                    >
                    {expanded ? "Show less" : "Read more"}
                    </p>
                }
            </div>
            }

            {isEditing &&
            <form onSubmit={form.handleSubmit(onUpdateSubmit)}>
                <Controller 
                    name="comment"
                    control={form.control}
                    render={({field, fieldState}) => (
                        <Field data-invalid={fieldState.invalid}>
                            <InputGroup>
                                <InputGroupTextarea
                                    {...field}
                                    disabled={isSubmitting}
                                    className="resize-none"
                                    aria-invalid={fieldState.invalid}
                                />
                                <InputGroupAddon align="block-end">
                                    <InputGroupText>
                                        {field.value.length}/1000 characters
                                    </InputGroupText>
                                    <div className="flex gap-2 ml-auto">
                                        <InputGroupButton 
                                            size="sm"
                                            variant="secondary"
                                            disabled={isSubmitting} 
                                            className="cursor-pointer"
                                            onClick={() => onCancelSubmit()}    
                                        >
                                            Cancel
                                        </InputGroupButton>    
                                        <InputGroupButton 
                                            size="sm"
                                            type="submit"
                                            variant="default"
                                            disabled={isSubmitting} 
                                            className="cursor-pointer"    
                                        >
                                            Save
                                        </InputGroupButton>   
                                    </div>
                                </InputGroupAddon>
                            </InputGroup>
                            {fieldState.invalid && (
                                <FieldError errors={[fieldState.error]} />
                            )}
                        </Field>
                    )}
                />
            </form>
            }
        </div>
    )
}