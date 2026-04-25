import { useAuth } from "@/contexts/AuthContext"
import { Editor } from '@tinymce/tinymce-react';

// Components
import { PageForbiddenScreen } from "./PageForbiddenScreen";
import { useState } from "react";

export function CreatePostScreen() {
    const [ apiKey, setApiKey ] = useState<string | undefined>(undefined);
    const { user } = useAuth();

    return (
        <>
        {user && user.role === "AUTHOR" ? 
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
                    'code',
                    'wordcount',
                ],
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline | align lineheight | checklist numlist bullist indent outdent | image',
                codesample_languages: [
                    { text: 'HTML/XML', value: 'markup' },
                    { text: 'JavaScript', value: 'javascript' },
                    { text: 'CSS', value: 'css' },
                    { text: 'PHP', value: 'php' },
                    { text: 'Ruby', value: 'ruby' },
                    { text: 'Python', value: 'python' },
                    { text: 'Java', value: 'java' },
                    { text: 'C', value: 'c' },
                    { text: 'C#', value: 'csharp' },
                    { text: 'C++', value: 'cpp' }
                ],
                codesample_highlight: true,
                skin: 'dark',
                content_css: 'tinymce-5-dark'
            }}
            initialValue="Welcome to TinyMCE!"
            />
            :
            <PageForbiddenScreen />
        }
        </>
    );
}