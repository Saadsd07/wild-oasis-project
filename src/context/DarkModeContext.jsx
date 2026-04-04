import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const darkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(false, "darkMode");

    function toggleDarkMode() {
        setIsDarkMode(isDark => !isDark);
    }

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark-mode");
            document.documentElement.classList.remove("light-mode");
        } else {
            document.documentElement.classList.add("light-mode");
            document.documentElement.classList.remove("dark-mode");
        }
    }, [isDarkMode]);


    return (
        <darkModeContext.Provider value={{isDarkMode, toggleDarkMode}}>
            {children}
        </darkModeContext.Provider>
    )
}

const useDarkMode = () => {
    const context = useContext(darkModeContext);
    if (!context) {
        throw new Error("useDarkMode must be used within a DarkModeProvider");
    }
    return context;
};

export { DarkModeProvider, useDarkMode };