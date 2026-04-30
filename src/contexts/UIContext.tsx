import React, { createContext, useState, useContext } from 'react';

type UIContextProps = {
    isLoading: boolean,
    setIsLoading: (isLoading: boolean) => void
}

const UIContext = createContext<UIContextProps>({
    isLoading: false,
    setIsLoading: () => {}
});

export default function UIProvider({ children }: { children: React.ReactNode }) {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const values = {
        isLoading,
        setIsLoading
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