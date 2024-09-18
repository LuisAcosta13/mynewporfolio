"use client";

import LocaleSwicher from "./localeSwitcher/localeSwitcher";
import "../../styles/menu.scss"
import DarkModeBttn from "./darkModeBttn/DarkModeBttn";
import { useEffect, useRef } from "react";
import { useTheme } from "../../ThemeContext";
import Image from "next/image";
import blackLogo from "/public/images/logo-dark.png"
import whiteLogo from "/public/images/logo-white.png"

export default function Menu({ lang, dictionary }) {
  const menuRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    let lastScrollTop = 0;
    const menu = menuRef.current;
    const showThreshold = 80;

    function handleMouseMove(e) {
      if (e.clientY <= showThreshold) {
        // Mostrar el menú si el mouse está en la parte superior
        menu.style.transform = 'translateY(0)';
      } else {
        //menu.style.transform = 'translateY(-100%)';
      }
    }

    function handleScroll() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop === 0) {
        menu.style.transform = 'translateY(0)';
        window.removeEventListener('mousemove', handleMouseMove);
      } else if (scrollTop > lastScrollTop) {
        menu.style.transform = 'translateY(-100%)';
        window.addEventListener('mousemove', handleMouseMove);
      } else {
        menu.style.transform = 'translateY(0)';
      }
      lastScrollTop = scrollTop;
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [])

  return (
    <div id="menu" ref={menuRef} className="menu">
      <div className="padding">
        <section className="logo">
          <Image src={theme === "dark" ? whiteLogo : blackLogo}/>
        </section>
        <section className="buttons">
          <div className="theme-button">
            <DarkModeBttn />
            <span className="info-bubble">{dictionary.menu.theme}</span>
          </div>
          <div className="lang-button">
            <LocaleSwicher lang={lang} />
            <span className="info-bubble">{dictionary.menu.language}</span>
          </div>
        </section>
      </div>
    </div>
  );
}