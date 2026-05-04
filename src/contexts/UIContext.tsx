import React, { createContext, useState, useContext, useEffect } from 'react';

// types
import type { IError } from '@/components/types/Error';
import { toast } from 'sonner';

type UIContextProps = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    error: IError | undefined,
    setError: (error: IError) => void,
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {},
    error: undefined,
    setError: () => {}
});

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | undefined>();

    useEffect(() => {
        if(error) {
            toast.warning(error?.title, {
                description: error?.description
            });
        }
    }, [error]);

    const values = {
        isLoading,
        setIsLoading,
        error,
        setError
    }

    return (
        <UIContext value={values}>
            { children }
        </UIContext>
    )
}

export function useUI() {
    return useContext(UIContext);
}