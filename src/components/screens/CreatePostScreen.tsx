import { useAuth } from "@/contexts/AuthContext"
import { useUI } from "@/contexts/UIContext";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { Button } from "../ui/button";
import { 
    Field,
    FieldGroup,
    FieldError,
} from "../ui/field";
import { toast } from "sonner";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const formSchema = z.object({
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

export function CreatePostScreen() {
    const { user, refreshToken } = useAuth();
    const { isLoading, setIsLoading } = useUI();

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
        await toast.promise(
            async () => {
                try {
                    setIsLoading(true);
                    const body = {
                        ...data,
                        published: true,
                        authorId: user?.id
                    };
                    
                    let response = await fetch(`${VITE_API_URL}/api/posts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                        credentials: "include",
                    });
                    
                    if(response.status === 401) {
                        console.log("refreshing");
                        await refreshToken();
                        response = await fetch(`${VITE_API_URL}/api/posts`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body),
                            credentials: "include",
                        });
                    }
                    const result = await response.json();
                    
                    if(!response.ok) {
                        toast.warning(result.error, {
                            position: "top-center",
                            description: "Please try again."
                        });
                    } else {
                        toast.success(result.message, {
                            position: "top-center",
                            description: "View the new post on the home page."
                        })
                    }
                } finally {
                    setIsLoading(false);
                }
            }, {
                position: "top-center",
                loading: "Submitting post...",
            }
        );
    }

    async function onSave(data: z.infer<typeof formSchema>) {
        await toast.promise(
            async () => {
                try {
                    setIsLoading(true);
                    const body = {
                        ...data,
                        published: false,
                        authorId: user?.id
                    };
                    
                    let response = await fetch(`${VITE_API_URL}/api/posts`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(body),
                        credentials: "include",
                    });
                    if(response.status === 401) {
                        console.log("refreshing");
                        await refreshToken();
                        response = await fetch(`${VITE_API_URL}/api/posts`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(body),
                            credentials: "include",
                        });
                    }
                    const result = await response.json();
                    
                    if(!response.ok) {
                        toast.warning(result.error, {
                            position: "top-center",
                            description: "Please try again."
                        });
                    } else {
                        toast.success(result.message, {
                            position: "top-center",
                            description: "View saved posts in your profile."
                        });
                    }
                } finally {
                    setIsLoading(false);
                }
            }, {
                position: "top-center",
                loading: "Saving post...",
            }
        );
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