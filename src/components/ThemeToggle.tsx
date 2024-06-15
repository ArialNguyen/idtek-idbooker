"use client";
import { useEffect,useState } from "react";
import { FaMoon } from "react-icons/fa";
import { BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(true)

    useEffect(() =>{
        const theme = localStorage.getItem("theme")
        if(theme === "dark") setDarkMode(true)
    }, [])

    useEffect(() => {
        if (darkMode){
            document.documentElement.classList.add('dark')
            localStorage.setItem("theme","dark")
        }
        else{
            document.documentElement.classList.remove('dark')
            localStorage.setItem("theme","light")
            
        }
    },[darkMode])
    return (
        <div
        className="relative w-16 h-8 flex items-center
        dark:bg"
        onClick={() => setDarkMode(!darkMode)}
        >
            <FaMoon className="text-white" size={18}/>
            <div
            className="absolute "

            style={darkMode ? {left: "2px"} :{right:"2px"}
        }
            ></div>
            <BsSunFill
            className="ml-auto"
            size={18}
            />
        </div>
    )
};