import { useAuth } from "@/contexts/AuthContext"

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import type { Content } from "@tiptap/react"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { Button } from "../ui/button";
import { toast } from "sonner";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function CreatePostScreen() {
    const [value, setValue] = useState<Content>("");
    const [title, setTitle] = useState<string>("");
    const { user } = useAuth();

    async function onSubmit() {
        // toast.promise()
        console.log(value);
    }

    async function onSave() {
        console.log(title);
    }

    return (
        <>
        {user && user.role === "AUTHOR" ? 
        <div className="md:mx-40 md:my-24 my-12 m-6 flex flex-col gap-12">
            <Label className="text-5xl font-extrabold">
                Create a Post
            </Label>
            <div
                className="flex flex-col gap-6"
            >
                <div>
                    <Label className="text-md">
                        Title:
                    </Label>
                    <Input 
                        onChange={(e) => setTitle(e.target.value)}
                        className="bg-input/30"
                    />
                </div>
                <div>
                    <Label className="text-md">
                        Content:
                    </Label>
                    <MinimalTiptapEditor
                        value={value}
                        onChange={setValue}
                        className="w-full"
                        editorContentClassName="p-5 bg-input/30"
                        output="html"
                        placeholder="Enter your description..."
                        autofocus={true}
                        editable={true}
                        editorClassName="focus:outline-hidden"
                    />
                </div>
                <div className="flex gap-2">
                    <Button 
                        className="w-fit cursor-pointer"
                        onClick={() => onSubmit()}
                    >
                        Submit
                    </Button>
                    <Button 
                        className="w-fit cursor-pointer"
                        variant={"secondary"}
                        onClick={() => onSave()}
                    >
                        Save
                    </Button>
                </div>
            </div>
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}