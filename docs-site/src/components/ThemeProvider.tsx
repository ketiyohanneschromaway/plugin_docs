'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
    theme: Theme;
    toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: 'dark',
    toggle: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark');

    // Init from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('docs-theme') as Theme | null;
        const preferred = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        const initial = saved ?? preferred;
        setTheme(initial);
        document.documentElement.setAttribute('data-theme', initial);
    }, []);

    const toggle = () => {
        setTheme((prev) => {
            const next = prev === 'dark' ? 'light' : 'dark';
            localStorage.setItem('docs-theme', next);
            document.documentElement.setAttribute('data-theme', next);
            return next;
        });
    };

    return (
        <ThemeContext.Provider value={{ theme, toggle }}>
            {children}
        </ThemeContext.Provider>
    );
}
