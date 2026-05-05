import React, { createContext, useState, useContext, useEffect } from 'react';

// types
import type { IError, ISuccess } from '@/components/types/Toast';
import { toast } from 'sonner';

type UIContextProps = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void,
    error: IError | undefined,
    setError: (error: IError) => void,
    success: ISuccess | undefined,
    setSuccess: (success: ISuccess) => void,
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {},
    error: undefined,
    setError: () => {},
    success: undefined,
    setSuccess: () => {},
});

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<IError | undefined>();
    const [success, setSuccess] = useState<ISuccess | undefined>();

    useEffect(() => {
        if(error) {
            toast.warning(error?.title, {
                description: error?.description
            });
        }
    }, [error]);
    
    useEffect(() => {
        if(success) {
            toast.success(success?.title, {
                description: success?.description
            });
        }
    }, [success]);

    const values = {
        isLoading,
        setIsLoading,
        error,
        setError,
        success,
        setSuccess
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