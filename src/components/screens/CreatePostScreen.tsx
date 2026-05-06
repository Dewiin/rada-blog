import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// api
import { createPost, savePost } from "@/api/posts";

// schemas
import { formSchema } from "@/zodSchemas/post";

// contexts
import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext";

// components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { Button } from "../ui/button";
import { Field, FieldGroup, FieldError } from "../ui/field";
import { toast } from "sonner";

export function CreatePostScreen() {
    const { user, refreshToken } = useAuth();
    const { isLoading, setIsLoading, setError, setSuccess } = useUI();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            subtitle: "",
            content: ""
        },
        mode: "onChange",
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        await toast.promise(createPost(data, setIsLoading, refreshToken, setError, setSuccess, user) , { loading: "Submitting post..." });
    }

    async function onSave(data: z.infer<typeof formSchema>) {
        await toast.promise(savePost(data, setIsLoading, refreshToken, setError, setSuccess, user), { loading: "Saving post..." });
    }

    return (
        <>
        {user && user.role === "AUTHOR" ? 
        <div className="md:mx-40 md:my-24 my-12 m-6 flex flex-col gap-12">
            <Label className="text-5xl font-extrabold">
                Create a Post
            </Label>
            <form 
                className="flex flex-col gap-8"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FieldGroup className="gap-8">
                    <div className="flex flex-col gap-2">
                        <Controller
                            name="title"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="My Title"
                                        autoComplete="off"
                                        className="font-extrabold"
                                        />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                            />
                        <Controller
                            name="subtitle"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className="gap-1">
                                    <Input
                                        {...field}
                                        aria-invalid={fieldState.invalid}
                                        placeholder="Write a preview subtitle..."
                                        autoComplete="off"
                                        className="font-thin"
                                        />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                    </div>
                    <Controller
                        name="content"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <MinimalTiptapEditor
                                    {...field}
                                    className="w-full"
                                    editorContentClassName="p-5 bg-input/30"
                                    output="html"
                                    placeholder="Enter your description..."
                                    autofocus={true}
                                    editable={true}
                                    editorClassName="focus:outline-hidden"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </FieldGroup>
                <div className="flex gap-2">
                    <Button 
                        className="w-fit cursor-pointer"
                        disabled={isLoading}
                        type="submit"
                    >
                        Submit
                    </Button>
                    <Button 
                        className="w-fit cursor-pointer"
                        variant={"secondary"}
                        onClick={form.handleSubmit(onSave)}
                        disabled={isLoading}
                        type="button"
                    >
                        Save
                    </Button>
                </div>
            </form>
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}