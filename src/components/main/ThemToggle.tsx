"use client"
// Client component for theme toggle
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";


export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        // On mount, check if dark mode is active
        setDark(document.documentElement.classList.contains("dark"));
    }, []);

    const toggleTheme = () => {
        if (dark) {
            document.documentElement.classList.remove("dark");
            setDark(false);
        } else {
            document.documentElement.classList.add("dark");
            setDark(true);
        }
    };

    return (
        <button
            onClick={toggleTheme}
            className="p-2 bg-white rounded-full border border-emerald-600  hover:bg-emerald-50 transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
            type="button"
        >
            {dark ? <Sun className="w-5 h-5 text-emerald-600" /> : <Moon className="w-5 h-5 text-emerald-600" />}
        </button>
    );
}