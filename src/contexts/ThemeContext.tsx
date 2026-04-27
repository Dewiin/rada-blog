import React, { createContext, useState, useContext, useEffect } from 'react';

type ThemeContextProps = {
    darkMode: boolean,
    setDarkMode: (darkMode: boolean) => void
}

const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    setDarkMode: () => {}
});

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(() => {
        const theme = localStorage.getItem("theme");
        if (theme === "dark") return true;
        if (theme === "light") return false;
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    const values = {
        darkMode,
        setDarkMode
    }

    return (
        <ThemeContext value={values}>
            { children }
        </ThemeContext>
    )
}

export function useTheme() {
    return useContext(ThemeContext);
}