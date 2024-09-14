"use client";
import { useState, useEffect } from "react";
import { applyTheme } from "../../../toggleDarkMode";
import { IoMdMoon } from "react-icons/io";
import { IoMdSunny } from "react-icons/io";
import "../../../styles/menu.scss"

export default function DarkModeBttn() {
    
    const [darkMdIcon, setDarkMdIcon] = useState(null)

    useEffect(() => {
        applyTheme()
        applyTheme() === "dark" ? setDarkMdIcon(<IoMdSunny/>) : setDarkMdIcon(<IoMdMoon/>) 
    }, []);

    const toggleDarkMode = () => {
        const isDark = document.body.classList.toggle('dark');

        if(isDark){
            localStorage.setItem('theme', 'dark');
            setDarkMdIcon(<IoMdSunny/>)
        } else {
            localStorage.setItem('theme', 'light');
            setDarkMdIcon(<IoMdMoon/>) 
        }

        
    };

    return (
        <>
            <div className="dark-mode" onClick={() => toggleDarkMode()}>
                {darkMdIcon}
            </div>
        </>
    );
}