import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || 'system';
    });

    const [bgType, setbgType] = useState(() => {
        return localStorage.getItem("BackgroundOptions") || 'none';
    });

    const [solidColor, setSolidColor] = useState(() => {
        return localStorage.getItem("BackgroundSolidColor") || '';
    });

    const [gradient, setGradient] = useState(() => {
        return localStorage.getItem('BackgroundGradientColor') || '';
    });

    const root = document.documentElement
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        const applyTheme = () => {
            const isDark =
                theme === "dark" || (theme === 'system' && mediaQuery.matches);

            if (isDark) {
                root.classList.add('dark')
            } else {
                root.classList.remove('dark')
            }
        }

        applyTheme();
        localStorage.setItem("theme", theme)

        if (theme === 'system') {
            mediaQuery.addEventListener('change', applyTheme)
            return () => mediaQuery.removeEventListener('change', applyTheme)
        }
    }, [theme])

    useEffect(() => {
        if (bgType == 'solid' && solidColor) {
            root.style.backgroundColor = solidColor;
            root.style.backgroundImage = 'none';
            localStorage.setItem('BackgroundOptions', 'solid');
            localStorage.setItem('BackgroundSolidColor', solidColor);
        } else if (bgType === 'gradient' && gradient) {
            root.style.backgroundImage = gradient;
            root.style.backgroundColor = 'transparent';
            localStorage.setItem('BackgroundOptions', 'gradient');
            localStorage.setItem('BackgroundGradientColor', gradient);
        } else {
            root.style.backgroundColor = '';
            root.style.backgroundImage = '';
            localStorage.setItem('BackgroundOptions', 'none');
        }
    }, [bgType, solidColor, gradient])

    return (
        <ThemeContext.Provider value={{ theme, setTheme, bgType, setbgType, solidColor, setSolidColor, gradient, setGradient }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a themeprovider')
    }
    return context
}