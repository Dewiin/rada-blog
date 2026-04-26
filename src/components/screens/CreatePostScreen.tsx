import { useAuth } from "@/contexts/AuthContext"
import { Editor } from '@tinymce/tinymce-react';

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { useEffect, useState } from "react";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function CreatePostScreen() {
    const [ apiKey, setApiKey ] = useState<string | undefined>(undefined);
    const { user } = useAuth();

    useEffect(() => {
        async function getApiKey() {
            try {
                const response = await fetch(`${VITE_API_URL}/api/keys`, {
                    method: "GET",
                    credentials: "include",
                });

                if(!response.ok) {
                    console.error("Error fetching api key: ", response.status, response.statusText);
                    return;
                }
                
                const result = await response.json();
                setApiKey(result.tiny_mce_api_key);
            } catch (err: any) {
                console.error("Error fetching api key: ", err);
            }
        }

        if(apiKey === undefined) {
            getApiKey();
        }
    }, [user, apiKey]);

    return (
        <>
        {user && user.role === "AUTHOR" ? 
        <div className="md:m-36 m-6">
            <Editor
                apiKey={apiKey}
                init={{
                    menubar: false,
                    statusbar: false,
                    height: 600,
                    plugins: [
                        'advlist',
                        'autolink',
                        'lists',
                        'link',
                        'image',
                        'table',
                        'wordcount',
                    ],
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | align lineheight | checklist numlist bullist indent outdent | image',
                    skin: 'oxide-dark',
                    content_css: 'tinymce-5-dark'
                }}
            />
        </div>
        :
        <PageForbiddenScreen />
        }
        </>
    );
}